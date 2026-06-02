const mongoose = require("mongoose");

module.exports = mongoose.model("ZohoMapping", {
  organization_id: String,
  company: String,
  city: String,
  state: String,
  zip: String
});