const express = require("express");
const router = express.Router();

const ctrl = require("../controller/admin/qboController");
const auth = require("../middleware/authMiddleware");

router.use(auth);

// ================= INIT =================
router.get("/init", ctrl.getInit);

// ================= CONNECTION =================
router.post("/connection", ctrl.saveConnection);
router.post("/connection/test", ctrl.testConnection);

// ================= QBO =================
router.get("/employees", ctrl.fetchEmployees);
router.get("/income-accounts", ctrl.fetchIncomeAccounts);

router.get("/qbo/connect", ctrl.connectQBO);
router.get("/qbo/callback", ctrl.callbackQBO);

// ================= TECHNICIANS =================
router.get("/technicians", ctrl.getTechnicians);

// ================= MAPPING =================
router.post("/mapping", ctrl.saveMapping);
router.delete("/mapping/:id", ctrl.deleteMapping);

// ================= SYNC =================
router.post("/sync", ctrl.syncData);

module.exports = router;