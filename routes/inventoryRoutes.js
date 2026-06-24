const express = require("express");
const router = express.Router();

const {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  archiveItem
} = require("../controller/admin/inventoryController");

router.post("/inventoryAdd", createItem);
router.get("/inventoryGet", getItems);
router.get("/inventoryGetById/:id", getItemById);
router.put("/inventoryUpdate/:id", updateItem);
router.delete("/inventoryDelete/:id", deleteItem);
router.put("/inventoryArchive/:id",archiveItem);

module.exports = router;