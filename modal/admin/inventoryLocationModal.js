const mongoose = require("mongoose");

const InventoryLocationSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      type: {
        type: String,
        enum: [
          "Warehouse",
          "Vehicle",
          "Trailer",
          "Storage Unit",
        ],
        default: "Warehouse",
      },

      description: {
        type: String,
        default: "",
      },

      active: {
        type: Boolean,
        default: true,
      },

      archived: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "inventoryLocation",
  InventoryLocationSchema
);