const express = require("express");
const router = express.Router();

const {createUser,getUsers} = require("../controller/admin/userController");
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