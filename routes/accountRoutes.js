// ===========================================
// routes/account.routes.js
// ===========================================

const express = require("express");

const router = express.Router();

const accountController = require(
  "../controller/accounts/accountController"
);

const checkPermission = require(
  "../middleware/checkPermission"
);

// ===========================================
// CREATE ACCOUNT
// ===========================================

router.post("/createacc",checkPermission("account.create"),accountController.createAccount);

// ===========================================
// GET ALL ACCOUNTS
// ===========================================

router.get("/getacc",checkPermission("account.view"),accountController.getAccounts);

// ===========================================
// GET SINGLE ACCOUNT DETAILS
// ===========================================

// router.get("/:id",checkPermission("account.view"),accountController.getAccountDetails);

// ===========================================
// UPDATE ACCOUNT
// ===========================================

router.put("/update/:id",checkPermission("account.edit"),accountController.updateAccount);

// ===========================================
// DELETE ACCOUNT
// ===========================================

router.delete("/delete/:id",checkPermission("account.delete"),accountController.deleteAccount);

module.exports = router;