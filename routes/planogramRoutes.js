const express = require("express");

const router = express.Router();

const {
  createPlanogram,
  getPlanograms,
  getPlanogramById,
  updatePlanogram,
  archivePlanogram,
  deletePlanogram,
} = require("../controller/admin/planogramController");

router.post("/planogramAdd", createPlanogram);

router.get("/planogramGet", getPlanograms);

router.get("/planogramGetById:id", getPlanogramById);

router.put("/planogramUpdate/:id", updatePlanogram);

router.put("/planogramArchive/:id",archivePlanogram);

router.delete("/planogramDel/:id",deletePlanogram);

module.exports = router;