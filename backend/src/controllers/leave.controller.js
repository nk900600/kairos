const { calculateDuration } = require("../utils/util");
const { Leave, LeaveStatus, LeaveType } = require("./../models/leave.model"); // Path to your Leave model

class LeaveController {
  // Create a new leave request
  async createLeave(req, res) {
    try {
      if (
        !req.body?.startDate ||
        !req.body?.endDate ||
        !req.body?.LeaveTypeId
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const duration = calculateDuration(req.body.startDate, req.body.endDate);

      const leaveType = await Leave.create(
        { ...req.body, duration, firmId: req.user.firmId },
        { userId: req.user.id }
      );
      return res.status(201).json(leaveType);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve all leave requests
  async getAllLeaves(req, res) {
    try {
      const leaveTypes = await Leave.findAll({ include: LeaveType });
      return res.status(200).json(leaveTypes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve a single leave request by ID
  async getLeave(req, res) {
    try {
      const leave = await Leave.findByPk(req.params.id, { include: LeaveType });
      if (leave) {
        res.json(leave);
      } else {
        res.status(404).json({ error: "leave not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a leave request
  async updateLeave(req, res) {
    try {
      if (!req.body?.startDate || !req.body?.endDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const leaveType = await Leave.findByPk(req.params.id);
      if (!leaveType) {
        return res.status(404).json({ message: "LeaveType not found" });
      }

      if (leaveType.status != LeaveStatus.PENDING) {
        return res.status(404).json({ message: "Leave is marked as solved" });
      }

      const duration = calculateDuration(req.body.startDate, req.body.endDate);

      await leaveType.update(
        { ...req.body, duration },
        { userId: req.user.id }
      );
      return res.status(200).json(leaveType);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete a leave request
  async deleteLeave(req, res) {
    try {
      const leaveType = await Leave.findByPk(req.params.id);
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

module.exports = new LeaveController();
