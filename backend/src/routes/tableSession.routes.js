const express = require("express");
const router = express.Router();
const tableSessionController = require("../controllers/tableSession.controller");

router.post("/", tableSessionController.createSession);
router.put("/:id", tableSessionController.updateSession);

module.exports = router;
