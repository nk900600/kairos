const express = require("express");
const router = express.Router();
const LeaveTypeController = require("../controllers/leaveTypes.controller");

// Create a new LeaveType
router.post("/", LeaveTypeController.createLeaveType);

// Get all LeaveTypes
router.get("/", LeaveTypeController.getAllLeaveTypes);

// Update a LeaveType
router.put("/:id", LeaveTypeController.updateLeaveType);

// Delete a LeaveType
router.delete("/:id", LeaveTypeController.deleteLeaveType);

module.exports = router;
