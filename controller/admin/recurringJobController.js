const RecurringJob = require("../../modal/admin/recurringJobModal");

// ===============================
// Create Job
// ===============================
exports.createJob = async (req, res) => {
  try {
    const {
      jobTemplate,
      title,
      client,
      frequency,
      intervalx,
      priority,
      scheduleStart,
      scheduleEnd,
      description,
      checklist,
      address,
      city,
      state,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Job title is required",
      });
    }

    const job = await RecurringJob.create({
      jobTemplate,
      title,
      client,
      frequency,
      intervalx,
      priority,
      scheduleStart,
      scheduleEnd,
      description,
      checklist,
      address,
      city,
      state,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
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
      page = 1,
      limit = 10,
    } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (technician) {
      filter.assignedTechnician = technician;
    }

    if (client) {
      filter.client = client;
    }

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

    const jobs = await RecurringJob.find(filter)
      .populate("client")
      .populate("frequency")
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await RecurringJob.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: jobs,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
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
    const job = await RecurringJob.findById(req.params.id)
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
    const job = await RecurringJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updatedJob = await RecurringJob.findByIdAndUpdate(
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

    const job = await RecurringJob.findByIdAndUpdate(
      req.params.id,
      {
        status,
        updatedBy: req.user._id,
      },
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
    const job = await RecurringJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await RecurringJob.findByIdAndDelete(req.params.id);

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