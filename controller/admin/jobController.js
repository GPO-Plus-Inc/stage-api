const Job = require("../../modal/admin/jobModal");

// ===============================
// Create Job
// ===============================
exports.createJob = async (req, res) => {
  try {
    const {
      jobTemplate,
      title,
      client,
      assignedTechnician,
      priority,
      scheduleStart,
      scheduleEnd,
      description,
      checklist,
      address,
      city,
      state,
      estimatedDuration,
      estimatedAmount,
      actualAmount,
      notes,
    } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required",
      });
    }

    if (!client) {
      return res.status(400).json({
        success: false,
        message: "Client is required",
      });
    }

    if (!scheduleStart) {
      return res.status(400).json({
        success: false,
        message: "Schedule start date is required",
      });
    }

    const job = await Job.create({
      jobTemplate,
      title,
      client,
      assignedTechnician: assignedTechnician || null,
      priority: priority || "Medium",

      scheduleStart,
      scheduleEnd: scheduleEnd || null,

      description,
      checklist: checklist || [],

      address,
      city,
      state,

      estimatedDuration: estimatedDuration || 0,
      estimatedAmount: estimatedAmount || 0,
      actualAmount: actualAmount || 0,

      notes: notes || "",

      status: "Pending",

      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get All Jobs
// ===============================
exports.getJobs = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      technician,
      client,
      date,
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    // Today's Date
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Status Filter
    if (status) {
      if (status === "scheduled") {
        filter.status = {
          $in: ["Pending", "Assigned", "In Progress"],
        };
      } else {
        filter.status = status;
      }
    }

    // Date Filter
    if (date === "today") {
      filter.$and = [
        {
          scheduleStart: {
            $lte: todayEnd,
          },
        },
        {
          $or: [
            {
              scheduleEnd: {
                $gte: todayStart,
              },
            },
            {
              scheduleEnd: null,
            },
          ],
        },
      ];
    }

    // Priority
    if (priority) {
      filter.priority = priority;
    }

    // Technician
    if (technician) {
      filter.assignedTechnician = technician;
    }

    // Client
    if (client) {
      filter.client = client;
    }

    // Search
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const jobs = await Job.find(filter)
      .populate("client", "location_name company city")
      .populate("assignedTechnician", "name email")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ scheduleStart: 1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Job.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Get Single Job
// ===============================
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("client")
      .populate("assignedTechnician")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Job
// ===============================
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user._id,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Job Status
// ===============================
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Assigned",
      "In Progress",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updateData = {
      status,
      updatedBy: req.user._id,
    };

    // Set completedAt only when job is completed
    if (status === "Completed") {
      updateData.completedAt = new Date();
    } else {
      updateData.completedAt = null;
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Delete Job
// ===============================
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

