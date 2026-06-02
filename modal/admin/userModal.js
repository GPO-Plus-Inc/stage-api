const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: String,
  email: String,
  password: String,

  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "role"
  },

  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  }

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);