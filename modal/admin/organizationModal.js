const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company_email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    company_phone: {
      type: String,
    },

    company_address: {
      type: String,
    },

    company_city: {
      type: String,
    },

    company_state: {
      type: String,
    },

    company_zip: {
      type: String,
    },

    header_color: {
      type: String,
      default: "#000000",
    },

    accent_color: {
      type: String,
      default: "#ffffff",
    },

    logo_url: {
      type: String,
    },

    billing_contact: {
      type: String,
    },

    billing_contact_email: {
      type: String,
    },

    website_url: {
      type: String,
    },

    nav_active_color: {
      type: String,
    },

    estimate_sequence_prefix: {
      type: String,
      default: "EST-",
    },

    estimate_sequence_next: {
      type: Number,
      default: 1,
    },

    quote_sequence_prefix: {
      type: String,
      default: "Q-",
    },

    quote_sequence_next: {
      type: Number,
      default: 1,
    },

    tax_presets: [
      {
        type: String,
      },
    ],

    job_type_options: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("organization", organizationSchema);