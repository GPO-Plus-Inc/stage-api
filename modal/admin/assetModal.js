const mongoose = require("mongoose");

const AssetPhotoSchema =
  new mongoose.Schema(
    {
      url: {
        type: String,
        required: true,
      },
      caption: {
        type: String,
        default: "",
      },
    },
    { _id: true }
  );

const AssetSchema =
  new mongoose.Schema(
    {
      assetTag: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        default: "",
      },

      make: {
        type: String,
        default: "",
      },

      model: {
        type: String,
        default: "",
      },

      serial: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "in_field",
          "warehouse",
          "repair",
          "retired",
        ],
        default: "in_field",
      },

      serviceLocation: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "serviceLocation",
        default: null,
      },

      linkedItem: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "inventoryItem",
        default: null,
      },

      photos: [AssetPhotoSchema],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "asset",
    AssetSchema
  );