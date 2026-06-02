// ===============================
// models/Account.js
// ===============================

const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
    },

    last_name: {
      type: String,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const AccountSchema = new mongoose.Schema(
  {
    account_name: {
      type: String,
      required: true,
      trim: true,
    },

    parent_account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account",
      default: null,
    },

    price_list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PriceList",
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    primary_contact: {
      type: ContactSchema,
      required: true,
    },

    secondary_contact: {
      type: ContactSchema,
      default: {},
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("account", AccountSchema);