const Role = require("../../modal/admin/roleModal");


// Create Role
exports.createRole = async (req, res) => {
  try {

    const { name, permissions } = req.body;

    const role = new Role({
      name,
      permissions,
      organization_id: req.user.organization_id
    });

    const savedRole = await role.save();

    res.status(201).json({
      success: true,
      data: savedRole
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Get All Roles
exports.getRoles = async (req, res) => {
  try {

    const roles = await Role.find({
      organization_id: req.user.organization_id
    });

    res.json({
      success: true,
      data: roles
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Update Role Permissions
exports.updateRolePermissions = async (req, res) => {
  try {

    const roleId = req.params.id;
    const { permissions } = req.body;

    const role = await Role.findOneAndUpdate(
      {
        _id: roleId,
        organization_id: req.user.organization_id
      },
      { permissions },
      { new: true }
    );

    res.json({
      success: true,
      data: role
    });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message
    });

  }
};


// Delete Role
exports.deleteRole = async (req, res) => {
  try {

    const roleId = req.params.id;

    await Role.findOneAndDelete({
      _id: roleId,
      organization_id: req.user.organization_id
    });

    res.json({
      success: true,
      message: "Role deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};