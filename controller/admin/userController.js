const User = require("../../modal/admin/userModal");
const Role = require("../../modal/admin/roleModal");
const Org = require("../../modal/admin/organizationModal");
const bcrypt = require("bcryptjs");


// Create User
exports.createUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role_id,
      organization_id
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role_id,
      organization_id
    });

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      data: savedUser
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// Get Users
exports.getUsers = async (req, res) => {

  try {

    const users = await User.find({
      organization_id: req.user.organization_id
    })
      .populate("role_id");

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// Get Org
exports.getOrg = async (req, res) => {

  try {

    const orgData = await Org.find({})
    res.json({
      success: true,
      data: orgData
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.body; // Technician

    const roleData = await Role.findOne({
      name: role,
      organization_id: req.user.organization_id,
    });

    if (!roleData) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }

    const users = await User.find({
      organization_id: req.user.organization_id,
      role_id: roleData._id,
    }).select("_id name email");;


    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// Update User Role
exports.updateUserRole = async (req, res) => {

  try {

    const userId = req.params.id;
    const { role_id } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { role_id },
      { new: true }
    );

    res.json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// Delete User
exports.deleteUser = async (req, res) => {

  try {

    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};