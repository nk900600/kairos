const express = require("express");
const router = express.Router();
const documentController = require("./../controllers/document.contoller");

router.post("/", documentController.createDocument);
router.get("/", documentController.getAllDocuments);
router.get("/:id", documentController.getDocument);
router.put("/:id", documentController.updateDocument);
router.delete("/:id", documentController.deleteDocument);

module.exports = router;
