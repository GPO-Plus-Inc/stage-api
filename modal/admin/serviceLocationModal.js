const mongoose = require("mongoose");

const serviceLocationSchema =
  new mongoose.Schema({

    organization_id: {

      type:
        mongoose.Schema.Types.ObjectId,

      required: true,

      ref: "organization"
    },

    // ACCOUNT RELATION

    account_id: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "account"
    },

    // LOCATION NAME

    location_name: {

      type: String,

      required: true
    },

    // COMPANY / ACCOUNT

    company: {

      type: String,

      required: true
    },

    // PRIMARY CONTACT

    first_name: String,

    last_name: String,

    email: String,

    phone: String,

    // ADDRESS

    address: String,

    city: String,

    state: String,

    zip: String,

    country: String,

    // EXTRA

    notes: String,

    // ZOHO

    zoho_account_id: String,

    zoho_contact_id: String,

    created_at: {

      type: Date,

      default: Date.now
    },

    updated_at: {

      type: Date,

      default: Date.now
    }

  });

 
module.exports = mongoose.model("serviceLocation", serviceLocationSchema);