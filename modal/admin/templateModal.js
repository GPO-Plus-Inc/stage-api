const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    templateName: {
      type: String,
      required: true,
      trim: true,
    },

    templateType: {
      type: Number, 
      required: true,
    },

    companyName: String,
    address: String,
    phone: String,
    email: String,

    headerLogoUrl: String,

    headerColor: {
      type: String,
      default: "#1e3a8a",
    },

    accentColor: {
      type: String,
      default: "#3b82f6",
    },

    showPricing: {
      type: Boolean,
      default: true,
    },

    showDueDate: {
      type: Boolean,
      default: true,
    },

    paymentTerms: {
      type: String,
      default: "Net 30",
    },

    includeNotes: {
      type: Boolean,
      default: true,
    },

    includeSignature: {
      type: Boolean,
      default: true,
    },

    footerText: String,

    defaultInvoiceDate: String,
    defaultDueDate: String,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("template", TemplateSchema);