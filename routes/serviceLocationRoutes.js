const express = require("express")

const router = express.Router()

const auth = require("../middleware/authMiddleware");
const checkPermission = require(
  "../middleware/checkPermission"
);

router.use(auth);


const {

  createServiceLocation,

  getServiceLocation,

  getSingleLocation,

  deleteLocation

} = require(
  "../controller/admin/serviceLocationController"
)

// ==========================================
// CREATE LOCATION
// ==========================================

router.post(
  "/createServiceLocation",
  createServiceLocation
)

// ==========================================
// GET ALL LOCATIONS
// ==========================================

router.get("/getServiceLocation",checkPermission("client.view"),getServiceLocation)




// router.get(
//   "/getLocation/:id",
//   getSingleLocation
// )



// ==========================================
// GET SINGLE LOCATION
// ==========================================

// ==========================================
// DELETE LOCATION
// ==========================================

router.delete(
  "/deleteLocation/:id",
  deleteLocation
)

module.exports = router