const express = require("express");
const router = express.Router();


const ctrl = require("../controller/admin/zohoController");
const auth = require("../middleware/authMiddleware");

router.post("/zoho", auth, ctrl.saveConnection);
router.get("/zoho", auth, ctrl.getConnection);
router.post("/zoho/test", auth, ctrl.testConnection);
router.get("/zoho/fields", auth, ctrl.getZohoFields);
router.post("/zoho/mappings", auth, ctrl.saveMappings);
router.post("/zoho/sync", auth, ctrl.syncLocations);

module.exports = router;

