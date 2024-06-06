const express = require("express");
const router = express.Router();
const tableSessionController = require("../controllers/tableSession.controller");
router.get(
  "/average-data",
  tableSessionController.getAverageDataPerTableSessions
);
router.post("/", tableSessionController.createSession);
router.put("/:id", tableSessionController.updateSession);
router.delete("/:id", tableSessionController.deleteSession);
router.get("/:id", tableSessionController.getSessionById);
router.get("/", tableSessionController.getallSession);
router.put(
  "/:id/order-count",
  tableSessionController.incerementSessionOrderCount
);

module.exports = router;
