const Permission = require("../../modal/admin/permissionModal");


// get all permissions
exports.getPermissions = async (req,res)=>{

  try{

    const permissions = await Permission.find();

    res.json({
      success:true,
      data:permissions
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};


// create permission
exports.createPermission = async (req,res)=>{

  try{

    const {name,module,description} = req.body;

    const permission = await Permission.create({
      name,
      module,
      description
    });

    res.json({
      success:true,
      data:permission
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
