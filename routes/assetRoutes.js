const express = require(
  "express"
);

const router =
  express.Router();

const {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  archiveAsset,
  deleteAsset,
  addPhoto,
  deletePhoto,
} = require(
  "../controller/admin/assetController"
);

router.post(
  "/assetAdd",
  createAsset
);

router.get(
  "/assetGet",
  getAssets
);

router.get(
  "/assetGetById/:id",
  getAssetById
);

router.put(
  "/assetUpdate/:id",
  updateAsset
);

router.put(
  "/assetArchive/:id",
  archiveAsset
);

router.delete(
  "/assetDelete/:id",
  deleteAsset
);

router.post(
  "/assetAddPic/:id/photo",
  addPhoto
);

router.delete(
  "/assetDelPic/:id/photo/:photoId",
  deletePhoto
);

module.exports = router;