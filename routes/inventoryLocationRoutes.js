const express = require(
  "express"
);

const router =
  express.Router();

const {
  createLocation,
  getLocations,
  getLocationById,
  updateLocation,
  archiveLocation,
  deleteLocation,
} = require(
  "../controller/admin/inventoryLocationController"
);

router.post(
  "/inventoryLocationAdd",
  createLocation
);

router.get(
  "/inventoryLocationGet",
  getLocations
);

router.get(
  "/inventoryLocationGetById/:id",
  getLocationById
);

router.put(
  "/inventoryLocationUpdate/:id",
  updateLocation
);

router.put(
  "/inventoryLocationArchive/:id",
  archiveLocation
);

router.delete(
  "/inventoryLocationDel/:id",
  deleteLocation
);

module.exports = router;