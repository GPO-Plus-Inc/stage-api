const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    organization_id: {
      type: String,
      required: true,
      index: true,
    },

    technician_id: {
      type: String,
      required: true,
      index: true,
    },

    technician_name: String,

    technician_email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    qbo_employee_id: {
      type: String,
      required: true,
    },

    qbo_employee_name: String,
  },
  { timestamps: true }
);

/**
 * 🔥 VERY IMPORTANT (duplicate रोकने के लिए)
 */
schema.index(
  { organization_id: 1, technician_id: 1 },
  { unique: true }
);

module.exports = mongoose.model("qboMapping", schema);