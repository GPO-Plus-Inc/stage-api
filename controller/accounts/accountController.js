// ===========================================
// controllers/account.controller.js
// ===========================================

const Account = require("../../modal/admin/accountModal");
const ServiceLocation = require("../../modal/admin/serviceLocationModal");

// ===========================================
// CREATE ACCOUNT
// ===========================================

exports.createAccount = async (req, res) => {
  try {

    const body = req.body;

    const account = new Account({
      account_name: body.account_name,

      parent_account:
        body.parent_account || null,

      price_list:
        body.price_list || null,

      notes: body.notes,

      primary_contact: {
        first_name:
          body.primary_contact?.first_name,

        last_name:
          body.primary_contact?.last_name,

        company:
          body.primary_contact?.company,

        email:
          body.primary_contact?.email,

        phone:
          body.primary_contact?.phone,
      },

      secondary_contact: {
        first_name:
          body.secondary_contact?.first_name,

        last_name:
          body.secondary_contact?.last_name,

        company:
          body.secondary_contact?.company,

        email:
          body.secondary_contact?.email,

        phone:
          body.secondary_contact?.phone,
      },

      created_by: req.user._id,
    });

    await account.save();

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: account,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================================
// GET ACCOUNT DETAILS
// ===========================================

exports.getAccountDetails = async (req, res) => {
  try {

    const accountId = req.params.id;

    const account = await Account.findById(
      accountId
    )
      .populate("parent_account")
      .populate("price_list");

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    // =======================================
    // FIND USED SERVICE LOCATIONS
    // =======================================

    const serviceLocations =
      await ServiceLocation.find({
        account_id: accountId,
      }).select(
        "location_name address createdAt"
      );

    return res.status(200).json({
      success: true,

      data: {
        account,
        used_in_service_locations:
          serviceLocations,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================================
// GET ALL ACCOUNTS
// ===========================================

// exports.getAccounts = async (req, res) => {
//   try {

//     const accounts = await Account.find({
//       is_deleted: false,
//     })
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       data: accounts,
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
 

exports.getAccounts = async (req, res) => {
  try {

    const accounts = await Account.aggregate([

      // ONLY ACTIVE ACCOUNTS
      {
        $match: {
          is_deleted: false
        }
      },

      // GET SERVICE LOCATIONS
      {
        $lookup: {
          from: "servicelocations", // mongodb collection name
          localField: "_id",
          foreignField: "account_id",
          as: "locations"
        }
      },

      // LOCATION COUNT
      {
        $addFields: {
          locations_count: {
            $size: "$locations"
          }
        }
      },

      // SORT
      {
        $sort: {
          createdAt: -1
        }
      }

    ]);

    return res.status(200).json({
      success: true,
      data: accounts
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

// ===========================================
// UPDATE ACCOUNT
// ===========================================

exports.updateAccount = async (req, res) => {
  try {

    const accountId = req.params.id;

    const body = req.body;

    const account = await Account.findById(
      accountId
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    account.account_name =
      body.account_name;

    account.parent_account =
      body.parent_account || null;

    account.price_list =
      body.price_list || null;

    account.notes =
      body.notes;

    account.primary_contact =
      body.primary_contact;

    account.secondary_contact =
      body.secondary_contact;

    account.updated_by =
      req.user._id;

    await account.save();

    return res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: account,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================================
// DELETE ACCOUNT
// ===========================================

exports.deleteAccount = async (req, res) => {
  try {

    const accountId = req.params.id;

    const account = await Account.findById(
      accountId
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    account.is_deleted = true;

    await account.save();

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};