const express = require("express");

const router = express.Router();

const recurringJobController = require("../controller/admin/recurringJobController");

const auth = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

// ===============================
// Create Job
// ===============================
router.post(
  "/recurringJobAdd",
  auth,
  checkPermission("job.create"),
  recurringJobController.createJob
);

// ===============================
// Get All Jobs
// ===============================
router.get(
  "/recurringJobList",
  auth,
  checkPermission("job.view"),
  recurringJobController.getJobs
);

// ===============================
// Get Single Job
// ===============================
router.get(
  "/recurringJobGet/:id",
  auth,
  checkPermission("job.view"),
  recurringJobController.getJobById
);

// ===============================
// Update Job
// ===============================
router.put(
  "/recurringJobUpdate/:id",
  auth,
  checkPermission("job.update"),
  recurringJobController.updateJob
);

// ===============================
// Update Job Status
// ===============================
router.patch(
  "/recurringJobStatus/:id",
  auth,
  checkPermission("job.update"),
  recurringJobController.updateJobStatus
);

// ===============================
// Delete Job
// ===============================
router.delete(
  "/recurringJobdel/:id",
  auth,
  checkPermission("job.delete"),
  recurringJobController.deleteJob
);

module.exports = router;