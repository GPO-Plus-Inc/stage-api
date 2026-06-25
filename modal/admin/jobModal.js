const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["section", "item"],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    jobTemplate: {
      type: String,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "serviceLocation",
      required: true,
    },

    // Technician
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    scheduleStart: {
      type: Date,
      required: true,
    },

    scheduleEnd: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    description: {
      type: String,
      trim: true,
    },

    checklist: [checklistSchema],

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    estimatedDuration: {
      type: Number,
      default: 0,
    },

    estimatedAmount: {
      type: Number,
      default: 0,
    },

    actualAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Assigned",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("job", jobSchema);