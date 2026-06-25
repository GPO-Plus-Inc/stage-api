const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
      required: true,
    },

    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },

    // Dashboard & Attendance
    isClockedIn: {
      type: Boolean,
      default: false,
    },

    clockInTime: {
      type: Date,
      default: null,
    },

    clockOutTime: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);