const Organization = require("../../modal/admin/organizationmodal");

const createOrganization = async (req, res) => {
  try {
    const organization = new Organization(req.body);
    const savedOrg = await organization.save();

    res.status(201).json({
      success: true,
      data: savedOrg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createOrganization };