// modal/admin/technicianModal.js

const mongoose = require("mongoose");

const TechnicianSchema = new mongoose.Schema({
  organization_id: String,
  name: String,
  email: String,
  role: String,
}, { timestamps: true });

module.exports = mongoose.model("qbotechnicians", TechnicianSchema);