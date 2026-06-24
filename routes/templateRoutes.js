const express = require("express");
const router = express.Router();

const {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  changeTemplateStatus,
} = require("../controller/admin/templateController");

const auth = require("../middleware/authMiddleware");

// Create
router.post("/templateAdd", auth, createTemplate);

// Get All
router.get("/templateList", auth, getTemplates);

// Get By Id
router.get("/template/:id", auth, getTemplateById);

// Update
router.put("/templateUpdate/:id", auth, updateTemplate);

// Status Change
router.patch("/templateStatus/:id", auth, changeTemplateStatus);

// Delete
router.delete("/templateDelete/:id", auth, deleteTemplate);

module.exports = router;