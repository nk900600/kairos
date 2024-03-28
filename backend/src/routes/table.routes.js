const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table.controller");

router.get("/", tableController.getAllTablesWithSessions);
router.post("/", tableController.createTable);
router.put("/:id", tableController.updateTable);
router.delete("/:id", tableController.deleteTable);
router.delete("/:id/create_reservation", tableController.createReservation);
router.delete("/:id/update_status", tableController.updateStatus);

module.exports = router;
