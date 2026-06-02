const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema({
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
});

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
    },

    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    scheduleStart: Date,

    scheduleEnd: Date,

    description: String,

    checklist: [checklistSchema],

    address: String,

    city: String,

    state: String,

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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("job", jobSchema);