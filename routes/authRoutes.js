const express = require("express");
const router = express.Router();

const authController = require("../controller/auth/loginController");

router.post("/login", authController.login);
router.get("/me", authController.me);

module.exports = router;