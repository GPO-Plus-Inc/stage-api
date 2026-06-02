const axios = require("axios");

const QBOConnection = require("../../modal/admin/qboConnectionModal");
const QBOMapping = require("../../modal/admin/qboMappingModal");
const QBOSyncLog = require("../../modal/admin/qboSyncLogModal");
const QBOTechnician = require("../../modal/admin/qbotechnicianModal");

const {
  getAccessToken,
  getEmployees,
  getIncomeAccounts,
  createTimeActivity,
} = require("../../service/qboService");

// 🔴 use your actual values (same as in Intuit app)
const CLIENT_ID = "ABUOCmJZBAxr7uSLw765LvA37rvf0fH15RjFpQy6bqg8bGi94L";
const CLIENT_SECRET = "r0VoLOkBdQokfZphfJM6AgeiohU0HuLSBhIK4Hzx";
const REDIRECT_URI = "http://localhost:1100/v1/qbo/callback";

// ================= CONNECT =================
exports.connectQBO = async (req, res) => {
  const url = `https://appcenter.intuit.com/connect/oauth2?client_id=${CLIENT_ID}&response_type=code&scope=com.intuit.quickbooks.accounting&redirect_uri=${REDIRECT_URI}&state=abc123`;
  res.json({ url });
};

// ================= CALLBACK =================
exports.callbackQBO = async (req, res) => {
  try {
    const { code, realmId } = req.query;
    if (!code || !realmId) {
      return res.status(400).send("Missing code or realmId");
    }

    const tokenRes = await axios.post(
      "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("TOKEN RESPONSE:", tokenRes.data);

    const { refresh_token } = tokenRes.data;

    const organization_id = req.user?.organization_id;
    if (organization_id) {
      await QBOConnection.findOneAndUpdate(
        { organization_id },
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          refresh_token,
          realm_id: realmId,
          is_active: true,
        },
        { upsert: true, new: true }
      );
    }

    // Return JSON for your Next.js to capture if needed
    return res.json({
      success: true,
      realmId,
      refresh_token,
    });
  } catch (err) {
    console.error("CALLBACK ERROR:", err.response?.data || err.message);
    res.status(500).send(err.response?.data || err.message);
  }
};

// ================= SAVE CONNECTION (from UI fields) =================
exports.saveConnection = async (req, res) => {
  try {
    const organization_id = req.user.organization_id;

    const {
      refresh_token,
      realm_id,
      default_employee_id,
      income_account_id,
    } = req.body;

    if (!refresh_token || !realm_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const connection = await QBOConnection.findOneAndUpdate(
      { organization_id },
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token,
        realm_id,
        default_employee_id,
        income_account_id,
        is_active: true,
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, data: connection });
  } catch (err) {
    console.error("SAVE CONNECTION ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= TEST =================
exports.testConnection = async (req, res) => {
  try {
    const config = await QBOConnection.findOne({
      organization_id: req.user.organization_id,
    });

    if (!config) {
      return res.status(400).json({ message: "Not configured" });
    }

    const token = await getAccessToken(config);

    res.json({ success: true, hasToken: !!token });
  } catch (err) {
    console.error("TEST ERROR:", err);
    res.status(400).json({ success: false, message: err.message });
  }
};

// ================= INIT =================
exports.getInit = async (req, res) => {
  try {
    const organization_id = req.user.organization_id;

    const connection = await QBOConnection.findOne({ organization_id });
    const mappings = await QBOMapping.find({ organization_id });

    res.json({ connection, mappings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= EMPLOYEES =================
exports.fetchEmployees = async (req, res) => {
  try {
    const config = await QBOConnection.findOne({
      organization_id: req.user.organization_id,
    });
    if (!config) return res.status(400).json({ message: "Not configured" });

    const token = await getAccessToken(config);
    const employees = await getEmployees(config, token);

   res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= INCOME ACCOUNTS =================
exports.fetchIncomeAccounts = async (req, res) => {
  try {
    const config = await QBOConnection.findOne({
      organization_id: req.user.organization_id,
    });

    const token = await getAccessToken(config);
    const accounts = await getIncomeAccounts(config, token);

    res.json({ success: true, data: accounts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= SAVE MAPPING =================
exports.saveMapping = async (req, res) => {
  try {
    const organization_id = req.user.organization_id;

    const {
      technician_id,
      technician_name,
      technician_email,
      qbo_employee_id,
      qbo_employee_name,
    } = req.body;

    if (!technician_id || !qbo_employee_id) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await QBOMapping.findOneAndUpdate(
      { organization_id, technician_id },
      {
        technician_name,
        technician_email,
        qbo_employee_id,
        qbo_employee_name,
      },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE MAPPING =================
exports.deleteMapping = async (req, res) => {
  try {
    await QBOMapping.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= SYNC =================
exports.syncData = async (req, res) => {
  const organization_id = req.user.organization_id;
  const { entries = [] } = req.body;

  let successCount = 0;
  let failCount = 0;

  try {
    const config = await QBOConnection.findOne({ organization_id });
    const mappings = await QBOMapping.find({ organization_id });

    const token = await getAccessToken(config);

    for (const entry of entries) {
      try {
        const map = mappings.find(
          (m) => m.technician_id === entry.technician_id
        );

        const employee_id =
          map?.qbo_employee_id || config.default_employee_id;

        console.log("ENTRY:", entry);
        console.log("EMPLOYEE USED:", employee_id);

        await createTimeActivity(config, token, {
          NameOf: "Employee",
          TxnDate: new Date().toISOString().split("T")[0], // REQUIRED
          EmployeeRef: { value: employee_id },
          Hours: entry.hours,
        });

        successCount++;
      } catch (err) {
        console.error(
          "SYNC ENTRY ERROR FULL:",
          err.response?.data || err.message
        );
        failCount++;
      }
    }

    await QBOSyncLog.create({
      organization_id,
      status: failCount ? "partial" : "success",
      processed_count: successCount,
      failed_count: failCount,
      payload: entries,
    });

    res.json({
      success: true,
      processed: successCount,
      failed: failCount,
    });
  } catch (err) {
    console.error("SYNC ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getTechnicians = async (req, res) => {
  try {
    const technicians = await QBOTechnician.find({
      organization_id: req.user.organization_id,
      role: "Technician",
    }).select("name email role");

    res.json(technicians);
  } catch (err) {
    console.error("TECHNICIAN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};