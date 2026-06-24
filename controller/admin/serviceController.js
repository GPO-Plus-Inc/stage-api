const Service = require("../../modal/admin/serviceModal");

// Create Service
exports.createService =
  async (req, res) => {
    try {
      const service =
        await Service.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: service,
      });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get All Services
exports.getServices =
  async (req, res) => {
    try {
      const services =
        await Service.find()
          .populate(
            "category"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        data: services,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get Single Service
exports.getServiceById =
  async (req, res) => {
    try {
      const service =
        await Service.findById(
          req.params.id
        ).populate(
          "category"
        );

      if (!service) {
        return res.status(404).json({
          success: false,
          message:
            "Service not found",
        });
      }

      res.json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Service
exports.updateService =
  async (req, res) => {
    try {
      const service =
        await Service.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Archive Service
exports.archiveService =
  async (req, res) => {
    try {
      const service =
        await Service.findByIdAndUpdate(
          req.params.id,
          {
            archived: true,
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Service
exports.deleteService =
  async (req, res) => {
    try {
      await Service.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Service deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Sync To QBO
exports.syncToQBO =
  async (req, res) => {
    try {
      const service =
        await Service.findByIdAndUpdate(
          req.params.id,
          {
            qboStatus:
              "Synced",
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        message:
          "Service synced successfully",
        data: service,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };