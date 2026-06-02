const Role = require("../modal/admin/roleModal");

module.exports = (permission) => {

  return async (req, res, next) => {

    try {

      const role = await Role.findById(req.user.role_id);

      if (!role) {
        return res.status(403).json({
          message: "Role not found"
        });
      }

      if (!role.permissions.includes(permission)) {
        return res.status(403).json({
          message: "Permission denied"
        });
      }

      next();

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  };

};