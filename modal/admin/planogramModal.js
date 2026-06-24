const mongoose = require("mongoose");

const GridCellSchema = new mongoose.Schema(
  {
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
    product: {
      type: String,
      default: "",
    },
    qty: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const PlanogramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    designerName: {
      type: String,
      default: "",
    },

    designerDescription: {
      type: String,
      default: "",
    },

    designerImageUrl: {
      type: String,
      default: "",
    },

    backgroundImage: {
      type: String,
      default: "",
    },

    rows: {
      type: Number,
      default: 3,
    },

    cols: {
      type: Number,
      default: 3,
    },

    serviceLocation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceLocation",
      default: null,
    },

    showLinkedOnly: {
      type: Boolean,
      default: false,
    },

    grid: [GridCellSchema],

    status: {
      type: String,
      enum: ["Active", "Archived"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model( "planogram",PlanogramSchema);