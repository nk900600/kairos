const sequelize = require("../db/db.js");
const { Employee, Designation, Role } = require("../models/employee.model.js");
const { Firm } = require("../models/firm.model.js");
const {
  Subscription,
  FirmSubscription,
} = require("../models/subscription.model.js");
const { mobileNumberRegex, emailRegex } = require("../utils/const.js");

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [Role, Firm, Designation],
      });
      return res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id, {
        include: [Role, Firm, Designation],
      });
      if (employee) {
        res.json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEmployee(req, res) {
    const transaction = await sequelize.transaction();
    try {
      if (
        !req.body?.mobileNumber ||
        !req.body?.firstName ||
        !req.body?.lastName
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Validate the mobile number
      if (
        req.body?.mobileNumber &&
        !mobileNumberRegex.test(req.body?.mobileNumber)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }

      if (
        req.body?.emergencyContactPhone &&
        !mobileNumberRegex.test(req.body?.emergencyContactPhone)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }

      // Validate the email
      if (req.body?.email && !emailRegex.test(req.body?.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const user = await Employee.findOne(
        {
          where: { mobileNumber: req.body.mobileNumber },
          paranoid: false, // Include soft-deleted records
        },
        { transaction }
      );
      // Restore the user
      if (user && user.removedAt) {
        await user.restore({ transaction });
        await user.update(
          {
            removedBy: null,
          },
          { transaction }
        );
        await transaction.commit();
        return res.json(user);
      }

      const employee = await Employee.create(
        {
          ...req.body,
          roleId: req.body.role,
          firmId: req.body.firmId,
          designationId: req.body.designation,
        },
        { userId: req.user.id, transaction }
      );
      await transaction.commit();
      return res.status(201).json(employee);
    } catch (error) {
      await transaction.rollback();
      return res.status(400).json({ error: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      if (
        req.body?.mobileNumber &&
        !mobileNumberRegex.test(req.body?.mobileNumber)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }
      if (
        req.body?.emergencyContactPhone &&
        !mobileNumberRegex.test(req.body?.emergencyContactPhone)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid emergencyContactPhone  format" });
      }
      // Validate the email
      if (req.body?.email && !emailRegex.test(req.body?.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.update(
          {
            ...req.body,
            roleId: req.body.role,
            firmId: req.body.firmId,
            designationId: req.body.designation,
          },
          { userId: req.user.id }
        );
        return res.json(employee);
      } else {
        return res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id, {
        include: [Firm, Designation],
      });
      if (employee) {
        // Optionally, you can perform additional actions before deleting, such as logging or unlinking associations
        await employee.destroy({ userId: req.user.id });
        return res.status(204).send(); // No content to send back
      } else {
        return res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getCurrentuserInfo(req, res) {
    try {
      let isEmployee = await Employee.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: Firm,
          },
          { model: Role },
          Designation,
        ],
      });

      let subscripition = await FirmSubscription.findOne({
        where: { FirmId: req.user.firmId },
      });
      return res.status(200).json({ employee: isEmployee, subscripition }); //
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new EmployeeController();
