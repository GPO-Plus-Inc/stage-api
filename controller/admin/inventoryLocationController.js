const InventoryLocation = require("../../modal/admin/inventoryLocationModal");

// Create Location
exports.createLocation =
  async (req, res) => {
    try {
      const location =
        await InventoryLocation.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: location,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get All Locations
exports.getLocations =
  async (req, res) => {
    try {
      const locations =
        await InventoryLocation.find({
          archived: false,
        }).sort({
          createdAt: -1,
        });

      res.json({
        success: true,
        data: locations,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Get Single Location
exports.getLocationById =
  async (req, res) => {
    try {
      const location =
        await InventoryLocation.findById(
          req.params.id
        );

      if (!location) {
        return res.status(404).json({
          success: false,
          message:
            "Location not found",
        });
      }

      res.json({
        success: true,
        data: location,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Location
exports.updateLocation =
  async (req, res) => {
    try {
      const location =
        await InventoryLocation.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: location,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Archive Location
exports.archiveLocation =
  async (req, res) => {
    try {
      const location =
        await InventoryLocation.findByIdAndUpdate(
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
        data: location,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Delete Location
exports.deleteLocation =
  async (req, res) => {
    try {
      await InventoryLocation.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Location deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };