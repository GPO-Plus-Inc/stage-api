const Equipment = require("../../modal/admin/equipmentModal");

exports.createEquipment =
  async (req, res) => {
    try {
      const equipment =
        await Equipment.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: equipment,
      });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getEquipments =
  async (req, res) => {
    try {
      const equipments =
        await Equipment.find()
          .populate(
            "serviceLocation"
          ) 
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        data: equipments,
      });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getEquipmentById =
  async (req, res) => {
    try {
      const equipment =
        await Equipment.findById(
          req.params.id
        )
          .populate(
            "serviceLocation"
          )
          .populate("linkedItem");

      if (!equipment) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Equipment not found",
          });
      }

      res.json({
        success: true,
        data: equipment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.updateEquipment =
  async (req, res) => {
    try {
      const equipment =
        await Equipment.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: equipment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.archiveEquipment =
  async (req, res) => {
    try {
      const equipment =
        await Equipment.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "Archived",
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: equipment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.deleteEquipment =
  async (req, res) => {
    try {
      await Equipment.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Equipment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.addPhoto =
  async (req, res) => {
    try {
      const equipment =
        await Equipment.findById(
          req.params.id
        );

      equipment.photos.push({
        url: req.body.url,
        caption:
          req.body.caption ||
          "",
      });

      await equipment.save();

      res.json({
        success: true,
        data: equipment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.deletePhoto =
  async (req, res) => {
    try {
      const equipment =
        await Equipment.findById(
          req.params.id
        );

      equipment.photos =
        equipment.photos.filter(
          (photo) =>
            photo._id.toString() !==
            req.params.photoId
        );

      await equipment.save();

      res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };