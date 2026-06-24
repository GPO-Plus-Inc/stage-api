const mongoose = require("mongoose");

const JobTemplateSchema = new mongoose.Schema(
  {
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    templateName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      default: "",
    },

    checklist: [
      {
        type: String,
      },
    ],

    defaultInvoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "template",
      default: null,
    },

    defaultReport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "template",
      default: null,
    },

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

module.exports = mongoose.model("jobTemplate", JobTemplateSchema);