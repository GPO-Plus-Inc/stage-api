const Template = require("../../modal/admin/templateModal");

// Create Template
exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create({
      ...req.body,
      organization_id: req.user.organization_id,
      created_by: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({
      organization_id: req.user.organization_id,
    })
      .populate("created_by", "first_name last_name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: templates.length,
      data: templates,
    });
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Template
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findOne({
      _id: req.params.id,
      organization_id: req.user.organization_id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
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

// Update Template
exports.updateTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
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
        message: "Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Template updated successfully",
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Template
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndDelete({
      _id: req.params.id,
      organization_id: req.user.organization_id,
    });

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Template deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Change Status
exports.changeTemplateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const template = await Template.findOneAndUpdate(
      {
        _id: req.params.id,
        organization_id: req.user.organization_id,
      },
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: template,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};