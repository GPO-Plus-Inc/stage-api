const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: Number,
      default: null
    },

    description: {
      type: String,
      default: "",
    },

    specialInstructions: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },

    qboStatus: {
      type: String,
      enum: [
        "Pending",
        "Synced",
        "Error",
      ],
      default: "Pending",
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
  "service",
  ServiceSchema
);