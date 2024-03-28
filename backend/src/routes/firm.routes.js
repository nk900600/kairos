const express = require("express");
const router = express.Router();
const firmController = require("../controllers/firm.controller");

router.post("/", firmController.createFirm);
router.get("/", firmController.getAllFirms);
router.get("/:id", firmController.getFirmById);
router.put("/:id", firmController.updateFirm);
router.delete("/:id", firmController.deleteFirm);

module.exports = router;
