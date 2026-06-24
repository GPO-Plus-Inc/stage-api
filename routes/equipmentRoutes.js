const express = require("express");

const router = express.Router();

const {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  archiveEquipment,
  deleteEquipment,
  addPhoto,
  deletePhoto,
} = require(
  "../controller/admin/equipmentController"
);

router.post(
  "/equipmentAdd",
  createEquipment
);

router.get(
  "/equipmentGet",
  getEquipments
);

router.get(
  "/equipmentGetById/:id",
  getEquipmentById
);

router.put(
  "/equipmentUpdate/:id",
  updateEquipment
);

router.put(
  "/equipmentArchive/:id",
  archiveEquipment
);

router.delete(
  "/equipmentDel/:id",
  deleteEquipment
);

router.post(
  "/equipmentPic/:id/photo",
  addPhoto
);

router.delete(
  "/equipmentPicDel/:id/photo/:photoId",
  deletePhoto
);

module.exports = router;