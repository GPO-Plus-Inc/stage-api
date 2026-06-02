const User = require("../../modal/admin/userModal");
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