const JobTemplate = require("../../modal/admin/jobTemplateModal");

// Create Job Template
exports.createJobTemplate = async (req, res) => {
  try {
    const jobTemplate = await JobTemplate.create({
      ...req.body,
      organization_id: req.user.organization_id,
      created_by: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job Template created successfully",
      data: jobTemplate,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getJobTemplates = async (req, res) => {
  try {
    const templates = await JobTemplate.find({
      organization_id: req.user.organization_id,
    })
      .populate("defaultInvoice", "templateName")
      .populate("defaultReport", "templateName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single
exports.getJobTemplateById = async (req, res) => {
  try {
    const template = await JobTemplate.findOne({
      _id: req.params.id,
      organization_id: req.user.organization_id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Job Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updateJobTemplate = async (req, res) => {
  try {
    const template = await JobTemplate.findOneAndUpdate(
      {
        _id: req.params.id,
        organization_id: req.user.organization_id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Job Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete
exports.deleteJobTemplate = async (req, res) => {
  try {
    const template = await JobTemplate.findOneAndDelete({
      _id: req.params.id,
      organization_id: req.user.organization_id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Job Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};