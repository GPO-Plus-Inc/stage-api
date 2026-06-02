const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  permissions: [
    {
      type: String
    }
  ],

  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organization",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("role", roleSchema);