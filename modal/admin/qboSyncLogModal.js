const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    organization_id: {
      type: String,
      index: true,
    },

    status: {
      type: String,
      enum: ["success", "failed", "partial"],
      required: true,
    },

    message: String,

    payload: {
      type: mongoose.Schema.Types.Mixed,
    },

    error_stack: String, // debugging ke liye

    processed_count: Number,
    failed_count: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("qboSyncLog", schema);