const express = require("express");
const router = express.Router();

const {createUser,getUsers,getUsersByRole,getOrg} = require("../controller/admin/userController");
const auth = require("../middleware/authMiddleware");
const permission = require("../middleware/checkPermission");

router.post(
  "/users",
  auth,
  permission("user.create"),
  createUser
);

router.get(
  "/users",
  auth,
  permission("user.view"),
  getUsers
);


router.post(
  "/getUsersByRole",
  auth,
  permission("role.view"),
  getUsersByRole
);


router.get(
  "/getOrg",
  auth,
  permission("org.view"),
  getOrg
);

// router.put(
//   "/users/:id",
//   auth,
//   permission("user.update"),
//   userController.updateUser
// );

// router.delete(
//   "/users/:id",
//   auth,
//   permission("user.delete"),
//   userController.deleteUser
// );

module.exports = router;