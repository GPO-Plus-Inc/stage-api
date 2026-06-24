const Planogram = require("../../modal/admin/planogramModal");

// Create
exports.createPlanogram = async (
  req,
  res
) => {
  try {
    const planogram =
      await Planogram.create(req.body);

    res.status(201).json({
      success: true,
      data: planogram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getPlanograms = async (
  req,
  res
) => {
  try {
    const planograms =
      await Planogram.find()
        .populate("serviceLocation")
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: planograms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get By Id
exports.getPlanogramById = async (
  req,
  res
) => {
  try {
    const planogram =
      await Planogram.findById(
        req.params.id
      ).populate("serviceLocation");

    if (!planogram) {
      return res.status(404).json({
        success: false,
        message:
          "Planogram not found",
      });
    }

    res.json({
      success: true,
      data: planogram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update
exports.updatePlanogram = async (
  req,
  res
) => {
  try {
    const planogram =
      await Planogram.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!planogram) {
      return res.status(404).json({
        success: false,
        message:
          "Planogram not found",
      });
    }

    res.json({
      success: true,
      data: planogram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Archive
exports.archivePlanogram =
  async (req, res) => {
    try {
      const planogram =
        await Planogram.findByIdAndUpdate(
          req.params.id,
          {
            status: "Archived",
          },
          { new: true }
        );

      res.json({
        success: true,
        data: planogram,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete
exports.deletePlanogram =
  async (req, res) => {
    try {
      await Planogram.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Planogram deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };