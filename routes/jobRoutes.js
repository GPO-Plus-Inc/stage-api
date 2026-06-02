const express = require("express");

const router = express.Router();

const jobController = require("../controller/admin/jobController");

const auth = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

// ===============================
// Create Job
// ===============================
router.post(
  "/jobAdd",
  auth,
  checkPermission("job.create"),
  jobController.createJob
);

// ===============================
// Get All Jobs
// ===============================
router.get(
  "/jobList",
  auth,
  checkPermission("job.view"),
  jobController.getJobs
);

// ===============================
// Get Single Job
// ===============================
router.get(
  "/jobGet/:id",
  auth,
  checkPermission("job.view"),
  jobController.getJobById
);

// ===============================
// Update Job
// ===============================
router.put(
  "/jobUpdate/:id",
  auth,
  checkPermission("job.update"),
  jobController.updateJob
);

// ===============================
// Update Job Status
// ===============================
router.patch(
  "/jobStatus/:id",
  auth,
  checkPermission("job.update"),
  jobController.updateJobStatus
);

// ===============================
// Delete Job
// ===============================
router.delete(
  "/jobdel/:id",
  auth,
  checkPermission("job.delete"),
  jobController.deleteJob
);

module.exports = router;