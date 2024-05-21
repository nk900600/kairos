const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firm.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/:id", firmController.getFirmById);
router.put("/:id", firmController.updateFirm);
router.delete("/:id", firmController.deleteFirm);
router.put("/:id/image", upload.single("file"), firmController.uploadImage);

module.exports = router;
