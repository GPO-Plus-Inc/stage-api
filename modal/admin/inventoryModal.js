const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sku: {
      type: String,
      trim: true,
      default: "",
    },
    barcode: {
      type: String,
      default: "",
    },
    barcodeType: {
      type: String,
      enum: ["UPC", "EAN", "Code128", "QR Code"],
      default: "UPC",
    },
    description: {
      type: String,
      default: "",
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    quantityOnHand: {
      type: Number,
      default: 0,
    },
    costOfGoodsSold: {
      type: Number,
      default: 0,
    },
    preferredVendor: {
      type: String,
      default: "",
    },
    reorderPoint: {
      type: Number,
      default: 0,
    },
    maxQuantity: {
      type: Number,
      default: 0,
    },

    incomeAccount: {
      type: String,
      default: "",
    },
    assetAccount: {
      type: String,
      default: "",
    },
    expenseAccount: {
      type: String,
      default: "",
    },

    customFields: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isArchived: {
  type: Boolean,
  default: false,
},

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("inventory",inventoryItemSchema);