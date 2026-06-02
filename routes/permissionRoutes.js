const express = require("express");
const router = express.Router();

const permissionController = require("../controller/admin/permissionController");

router.get("/permissions",permissionController.getPermissions);

router.post("/permissions",permissionController.createPermission);

module.exports = router;
