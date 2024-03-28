const Leave = require("./../models/leave.model"); // Path to your Leave model

class LeaveController {
  // Create a new leave request
  async createLeave(req, res) {
    const newLeave = new Leave(req.body);
    try {
      const savedLeave = await newLeave.save();
      res.status(201).json(savedLeave);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Retrieve all leave requests
  async getAllLeaves(req, res) {
    try {
      const leaves = await Leave.find();
      res.json(leaves);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Retrieve a single leave request by ID
  async getLeave(req, res) {
    try {
      const leave = await Leave.findById(req.params.id);
      if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
      }
      res.json(leave);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Update a leave request
  async updateLeave(req, res) {
    try {
      const updatedLeave = await Leave.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedLeave) {
        return res.status(404).json({ message: "Leave request not found" });
      }
      res.json(updatedLeave);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Delete a leave request
  async deleteLeave(req, res) {
    try {
      const deletedLeave = await Leave.findByIdAndDelete(req.params.id);
      if (!deletedLeave) {
        return res.status(404).json({ message: "Leave request not found" });
      }
      res.json({ message: "Leave request deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new LeaveController();
