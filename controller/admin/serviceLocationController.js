const mongoose = require("mongoose")

const ServiceLocation = require("../../modal/admin/serviceLocationModal")
const Account = require("../../modal/admin/accountModal")

// ==========================================
// CREATE SERVICE LOCATION
// ==========================================

exports.createServiceLocation =
async (req, res) => {

  try {

    const {

      organization_id,

      account,

      locationName,

      company,

      first_name,
      last_name,

      email,
      phone,

      street,
      city,
      state,
      zip,
      country,

      notes,

      zoho_account_id,
      zoho_contact_id

    } = req.body

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!company) {

      return res.status(400).json({

        success: false,

        message:
          "Company is required"
      })
    }

    // ==========================================
    // CREATE LOCATION
    // ==========================================

    const newLocation =
      await ServiceLocation.create({

        organization_id:
          new mongoose.Types.ObjectId(
            organization_id
          ),

        account_id:
          account
            ? new mongoose.Types.ObjectId(
                account
              )
            : null,

        location_name:
          locationName,

        // COMPANY

        company,

        // CONTACT

        first_name,
        last_name,

        email,
        phone,

        // ADDRESS

        address:
          street,

        city,
        state,
        zip,
        country,

        // EXTRA

        notes,

        // ZOHO

        zoho_account_id,
        zoho_contact_id
      })

    return res.status(201).json({

      success: true,

      message:
        "Service location created successfully",

      data: newLocation
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message:
        "Failed to create service location"
    })
  }
}

// ==========================================
// GET ALL LOCATIONS
// ==========================================

exports.getServiceLocation = async (req, res) => {
  console.log("-------------------")

  try {

    const acc =
      await ServiceLocation.find()

        .sort({
          created_at: -1
        })

    return res.status(200).json({

      success: true,

      data: acc
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch locations"
    })
  }
}

// ==========================================
// GET SINGLE LOCATION
// ==========================================

exports.getSingleLocation =
async (req, res) => {

  try {

    const location =
      await ServiceLocation.findById(
        req.params.id
      )

    if (!location) {

      return res.status(404).json({

        success: false,

        message:
          "Location not found"
      })
    }

    return res.status(200).json({

      success: true,

      data: location
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch location"
    })
  }
}

// ==========================================
// DELETE LOCATION
// ==========================================

exports.deleteLocation =
async (req, res) => {

  try {

    const deletedLocation =
      await ServiceLocation.findByIdAndDelete(
        req.params.id
      )

    if (!deletedLocation) {

      return res.status(404).json({

        success: false,

        message:
          "Location not found"
      })
    }

    return res.status(200).json({

      success: true,

      message:
        "Location deleted successfully"
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message:
        "Failed to delete location"
    })
  }
}