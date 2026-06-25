const express = require("express");
const router = express.Router();

const dashboardController = require("../controller/dashboard/dashboardController");
// Agar authentication middleware hai
const auth = require("../middleware/authMiddleware");

router.get(
  "/dashboardStats",
  auth,
  dashboardController.getDashboardStats
);


router.get("/recentJobs", auth, dashboardController.getRecentJobs);
// Dashboard Stats
 
// This Week
router.get("/thisWeek", auth, dashboardController.getThisWeekStats);

module.exports = router;