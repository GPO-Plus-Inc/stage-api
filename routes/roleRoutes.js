var express = require('express');
var router = express.Router();

const auth = require("../middleware/authMiddleware");
const permission = require("../middleware/checkPermission");
const {createRole,getRoles,updateRolePermissions} = require("../controller/admin/roleController");

router.post(
  "/roles",
  auth,
  permission("role.create"),
  createRole
);

router.get(
  "/roles",
  auth,
  permission("role.view"),
  getRoles
);

router.put("/updateRolePermissions/:id",auth,updateRolePermissions)

module.exports = router;