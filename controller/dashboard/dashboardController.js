const Job = require("../../modal/admin/jobModal");
const User = require("../../modal/admin/userModal");
const ServiceLocation = require("../../modal/admin/serviceLocationModal");

exports.getDashboardStats = async (req, res) => {
  try {
    // Today's Start & End
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    // Current Month Start
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    // Execute all queries in parallel
    const [
      jobsScheduledToday,
      jobsCompletedToday,
      workersScheduledToday,
      totalWorkers,
      totalServiceLocations,
      newServiceLocationsThisMonth,
    ] = await Promise.all([
      // Jobs Scheduled Today
      Job.countDocuments({
        scheduleStart: {
          $gte: start,
          $lte: end,
        },
      }),

      // Jobs Completed Today
      Job.countDocuments({
        status: "Completed",
        completedAt: {
          $gte: start,
          $lte: end,
        },
      }),

      // Unique Workers Scheduled Today
      Job.distinct("assignedTechnician", {
        scheduleStart: {
          $gte: start,
          $lte: end,
        },
      }),

      // Total Workers
      User.countDocuments(),

      // Total Service Locations
      ServiceLocation.countDocuments(),

      // New Service Locations This Month
      ServiceLocation.countDocuments({
        createdAt: {
          $gte: monthStart,
        },
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        jobsScheduledToday,
        jobsCompletedToday,

        workersScheduledToday: workersScheduledToday.length,
        totalWorkers,

        totalServiceLocations,
        newServiceLocationsThisMonth,

        revenueToday: 0,
        revenueThisMonth: 0,
      },
    });
  } catch (err) {
    console.error("Dashboard Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




exports.getRecentJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("client", "title location_name companyName address city")
      .sort({ createdAt: -1 })
      .limit(4)
      .select(
        "title status scheduleStart createdAt client priority assignedTechnician"
      );

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 

exports.getThisWeekStats = async (req, res) => {
  try {
    // Week Start (Sunday)
    const today = new Date();

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    // Week End (Saturday)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const [
      jobsCompleted,
      revenueResult,
      avgDurationResult,
    ] = await Promise.all([
      // Jobs Completed This Week
      Job.countDocuments({
        status: "Completed",
        completedAt: {
          $gte: weekStart,
          $lte: weekEnd,
        },
      }),

      // Revenue This Week
      Job.aggregate([
        {
          $match: {
            status: "Completed",
            completedAt: {
              $gte: weekStart,
              $lte: weekEnd,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$actualAmount",
            },
          },
        },
      ]),

      // Average Job Duration
      Job.aggregate([
        {
          $match: {
            status: "Completed",
            completedAt: {
              $gte: weekStart,
              $lte: weekEnd,
            },
            estimatedDuration: {
              $gt: 0,
            },
          },
        },
        {
          $group: {
            _id: null,
            avgDuration: {
              $avg: "$estimatedDuration",
            },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      data: {
        jobsCompleted,
        revenue:
          revenueResult.length > 0
            ? revenueResult[0].totalRevenue
            : 0,

        avgJobTime:
          avgDurationResult.length > 0
            ? Math.round(avgDurationResult[0].avgDuration)
            : 0,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};