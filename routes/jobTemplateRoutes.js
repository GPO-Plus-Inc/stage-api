const express = require("express");
const router = express.Router();

const {
  createJobTemplate,
  getJobTemplates,
  getJobTemplateById,
  updateJobTemplate,
  deleteJobTemplate,
} = require("../controller/admin/jobTemplateController");

const auth = require("../middleware/authMiddleware");

router.post("/jobTemplateAdd", auth, createJobTemplate);

router.get("/jobTemplatelist", auth, getJobTemplates);

router.get("/jobTemplate/:id", auth, getJobTemplateById);

router.put("/jobTemplateUpdate/:id", auth, updateJobTemplate);

router.delete("/jobTemplateDelete/:id", auth, deleteJobTemplate);

module.exports = router;