const express = require("express");
const router = express.Router();
const leaveController = require("./../controllers/leave.controller");

router.post("/", leaveController.createLeave);
router.get("/", leaveController.getAllLeaves);
router.get("/:id", leaveController.getLeave);
router.put("/:id", leaveController.updateLeave);
router.put("/:id/status", leaveController.updateLeaveStatus);
router.delete("/:id", leaveController.deleteLeave);

module.exports = router;
