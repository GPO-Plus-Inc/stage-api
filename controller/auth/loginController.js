const User = require("../../modal/admin/userModal");
const Token = require("../../modal/opaque/tokenModal");
const Role = require("../../modal/admin/roleModal");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    // token generate
    const token = crypto.randomBytes(40).toString("hex");

    await Token.create({
      token,
      user_id: user._id
    });

    // // cookie set for localhost
    // res.cookie("auth_token", token, {
    //   httpOnly: true,
    //   secure: false,   // production me true
    //   sameSite: "lax",
    //   maxAge: 24 * 60 * 60 * 1000 // 1 day
    // });


//   res.cookie("auth_token", token, {
//   httpOnly: true,
//   secure: true,
//   sameSite: "lax",
//   domain: ".prismplus.ai",
//   maxAge: 24 * 60 * 60 * 1000,
// });

const isProduction = process.env.NODE_ENV === "production";

res.cookie("auth_token", token, {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? ".prismplus.ai" : undefined,
  maxAge: 24 * 60 * 60 * 1000,
});

    res.json({
      message: "Login successful"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



exports.me = async (req, res) => {
  try {

    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const tokenRecord = await Token.findOne({ token });

    if (!tokenRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const user = await User.findById(tokenRecord.user_id)
      .populate("role_id");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const date = new Date(user.createdAt);

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role_id?.name,
        organization_id: user.organization_id,
        year: date.getFullYear(),
        month: date.toLocaleString("default", { month: "long" })
      });

  } catch (error) {
    console.log("error.message",error.message)
    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};