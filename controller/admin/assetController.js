const Asset = require("../../modal/admin/assetModal");

exports.createAsset =
  async (req, res) => {
    try {
      const asset =
        await Asset.create(
          req.body
        );

      res.status(201).json({
        success: true,
        data: asset,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getAssets =
  async (req, res) => {
    try {
      const assets =
        await Asset.find()
          .populate(
            "serviceLocation"
          ) 
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        data: assets,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.getAssetById =
  async (req, res) => {
    try {
      const asset =
        await Asset.findById(
          req.params.id
        )
          .populate(
            "serviceLocation"
          )
          .populate("linkedItem");

      if (!asset) {
        return res.status(404).json({
          success: false,
          message:
            "Asset not found",
        });
      }

      res.json({
        success: true,
        data: asset,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.updateAsset =
  async (req, res) => {
    try {
      const asset =
        await Asset.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: asset,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.archiveAsset =
  async (req, res) => {
    try {
      const asset =
        await Asset.findByIdAndUpdate(
          req.params.id,
          {
            status:
              "retired",
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: asset,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

exports.deleteAsset =
  async (req, res) => {
    try {
      await Asset.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Asset deleted successfully",
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
      const asset =
        await Asset.findById(
          req.params.id
        );

      asset.photos.push({
        url: req.body.url,
        caption:
          req.body.caption || "",
      });

      await asset.save();

      res.json({
        success: true,
        data: asset,
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
      const asset =
        await Asset.findById(
          req.params.id
        );

      asset.photos =
        asset.photos.filter(
          (photo) =>
            photo._id.toString() !==
            req.params.photoId
        );

      await asset.save();

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