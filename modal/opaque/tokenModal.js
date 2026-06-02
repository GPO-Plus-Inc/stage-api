const mongoose = require("mongoose");

const schema = new mongoose.Schema({

  token: {
    type: String,
    required: true
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  expires_at: Date

}, { timestamps: true });

module.exports = mongoose.model("opaque_token", schema);