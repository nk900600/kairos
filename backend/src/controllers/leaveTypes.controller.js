const { LeaveType } = require("../models/leave.model");

class LeaveTypeController {
  // Create a new LeaveType
  async createLeaveType(req, res) {
    try {
      if (!req.body?.name || !req.body?.numLeavesAvailable) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const leaveType = await LeaveType.create(
        { ...req.body, firmId: 1 },
        { userId: 1 }
      );
      return res.status(201).json(leaveType);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get all LeaveTypes
  async getAllLeaveTypes(req, res) {
    try {
      const leaveTypes = await LeaveType.findAll();
      return res.status(200).json(leaveTypes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update a LeaveType
  async updateLeaveType(req, res) {
    try {
      const leaveType = await LeaveType.findByPk(req.params.id);
      if (!leaveType) {
        return res.status(404).json({ message: "LeaveType not found" });
      }
      await leaveType.update(req.body);
      return res.status(200).json(leaveType);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete a LeaveType
  async deleteLeaveType(req, res) {
    try {
      const leaveType = await LeaveType.findByPk(req.params.id);
      if (!leaveType) {
        return res.status(404).json({ message: "LeaveType not found" });
      }
      await leaveType.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new LeaveTypeController();
