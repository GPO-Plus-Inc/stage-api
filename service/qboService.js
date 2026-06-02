const axios = require("axios");

const TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";
const BASE_URL = "https://sandbox-quickbooks.api.intuit.com";

// ===== ACCESS TOKEN (refresh -> access) =====
exports.getAccessToken = async (config) => {
  try {
    const res = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: config.refresh_token,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              config.client_id + ":" + config.client_secret
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // IMPORTANT: rotate refresh_token (QBO returns a new one)
    if (res.data?.refresh_token) {
      config.refresh_token = res.data.refresh_token;
      await config.save?.(); // mongoose doc
    }

    return res.data.access_token;
  } catch (err) {
    console.error("TOKEN ERROR:", err.response?.data || err.message);
    throw new Error("Token failed");
  }
};

// ===== GENERIC QUERY =====
async function queryQBO(config, token, query) {
  const res = await axios.get(
    `${BASE_URL}/v3/company/${config.realm_id}/query`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      params: { query },
    }
  );
  return res.data?.QueryResponse || {};
}

// ===== EMPLOYEES =====
exports.getEmployees = async (config, token) => {
  const data = await queryQBO(config, token, "select * from Employee");
  return data.Employee || [];
};

// ===== INCOME ACCOUNTS =====
exports.getIncomeAccounts = async (config, token) => {
  const data = await queryQBO(
    config,
    token,
    "select * from Account where AccountType='Income'"
  );
  return data.Account || [];
};

// ===== CREATE TIME ACTIVITY =====
exports.createTimeActivity = async (config, token, payload) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/v3/company/${config.realm_id}/timeactivity`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(
      "TIME ACTIVITY ERROR:",
      err.response?.data || err.message
    );
    throw err;
  }
};