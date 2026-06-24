const express = require(
  "express"
);

const router =
  express.Router();

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  archiveService,
  deleteService,
  syncToQBO,
} = require(
  "../controller/admin/serviceController"
);

router.post(
  "/serviceAdd",
  createService
);

router.get(
  "/serviceGet",
  getServices
);

router.get(
  "/serviceGetById/:id",
  getServiceById
);

router.put(
  "/serviceUpdate/:id",
  updateService
);

router.put(
  "/serviceArchive/:id",
  archiveService
);

router.put(
  "/serviceSync/:id",
  syncToQBO
);

router.delete(
  "/serviceDel/:id",
  deleteService
);

module.exports = router;