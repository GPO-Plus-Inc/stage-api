const Token = require("../modal/opaque/tokenModal");
const User = require("../modal/admin/userModal");

module.exports = async (req, res, next) => {

  try {

    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const tokenRecord = await Token.findOne({ token });

    if (!tokenRecord) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    const user = await User.findById(tokenRecord.user_id);

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};