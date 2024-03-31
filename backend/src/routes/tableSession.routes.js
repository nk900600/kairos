const express = require("express");
const router = express.Router();
const tableSessionController = require("../controllers/tableSession.controller");

router.post("/", tableSessionController.createSession);
router.put("/:id", tableSessionController.updateSession);
router.delete("/:id", tableSessionController.deleteSession);
router.get("/:id", tableSessionController.getSessionById);
router.get("/", tableSessionController.getallSession);
router.post("/:id/order-count", tableSessionController.updateSessionOrderCount);

module.exports = router;
