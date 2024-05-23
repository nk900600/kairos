const { calculatePercentageChange } = require("../utils/percentageCount");
const { calculateDuration } = require("../utils/util");
const { Leave, LeaveStatus, LeaveType } = require("./../models/leave.model"); // Path to your Leave model
const moment = require("moment");
const { Op } = require("sequelize");
class LeaveController {
  // Create a new leave request
  async createLeave(req, res) {
    try {
      if (
        !req.body?.startDate ||
        !req.body?.endDate ||
        !req.body?.LeaveTypeId ||
        !req.body?.managerId
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
      const leaveTypes = await Leave.findAll({
        include: LeaveType,
        where: { firmId: req.user.firmId },
      });
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
  // Update a leave request
  async updateLeaveStatus(req, res) {
    try {
      if (!req.body?.status) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const leaveType = await Leave.findByPk(req.params.id);
      if (!leaveType) {
        return res.status(404).json({ message: "LeaveType not found" });
      }

      if (leaveType.status != LeaveStatus.PENDING) {
        return res.status(404).json({ message: "Leave is marked as solved" });
      }

      await leaveType.update({ ...req.body }, { userId: req.user.id });
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

  async GetLeavesBetweenDatesRange(req, res) {
    const { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      const previousMonthStart = moment()
        .subtract(1, "month")
        .startOf("month")
        .toDate();
      const previousMonthEnd = moment()
        .subtract(1, "month")
        .endOf("month")
        .toDate();

      // Query the database for average ratings
      const leaves = await Leave.findAll({
        where: {
          firmId: req.user.firmId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      const employeesPreviousMonth = await Leave.count({
        where: {
          firmId: req.user.firmId,
          createdAt: {
            [Op.between]: [previousMonthStart, previousMonthEnd],
          },
        },
      });

      // Calculate the percentage changeconte
      const percentageChange = calculatePercentageChange(
        leaves,
        employeesPreviousMonth
      );
      return res
        .status(200)
        .json({ allLeaves: leaves, percentage: percentageChange.toFixed(1) });
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new LeaveController();
