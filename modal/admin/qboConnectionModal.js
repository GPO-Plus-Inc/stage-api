const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    organization_id: { type: String, required: true, index: true },
    client_id: {
      type: String,
      required: true,
    },

    client_secret: {
      type: String,
      required: true, 
    },

    refresh_token: {
      type: String,
      required: true,
 
    },

    realm_id: {
      type: String,
      required: true,
    },

    default_employee_id: String,

    income_account_id: String,

    is_active: {
      type: Boolean,
      default: true,
    },

    last_synced_at: Date,
  },
  { timestamps: true }
);
module.exports = mongoose.model("qboConnection",schema);