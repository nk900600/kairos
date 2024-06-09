const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table.controller");

// router.get("/", tableController.getAllTablesWithSessions);
router.get("/", tableController.getAllTables);
router.post("/", tableController.createTable);
router.post("/bulk", tableController.createBulkTable);
router.put("/:id", tableController.updateTable);
router.delete("/:id", tableController.deleteTable);
router.post("/:id/create-reservation", tableController.createReservation);
router.post("/:id/update-status", tableController.updateStatus);

module.exports = router;
