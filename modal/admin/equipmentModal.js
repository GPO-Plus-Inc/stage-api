const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema(
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
  { timestamps: true }
);

const EquipmentSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
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

      photos: [PhotoSchema],

      status: {
        type: String,
        enum: [
          "Active",
          "Archived",
        ],
        default: "Active",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =mongoose.model("equipment",EquipmentSchema);