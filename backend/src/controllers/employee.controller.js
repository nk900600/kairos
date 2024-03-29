const { Employee, Designation, Role } = require("../models/employee.model.js");
const { Firm } = require("../models/firm.model.js");
const { mobileNumberRegex, emailRegex } = require("../utils/const.js");

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [Role, Firm, Designation],
      });
      res.json(employees);
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
    try {
      // Validate the mobile number
      if (req.body?.mobileNumber && !emailRegex.test(req.body?.mobileNumber)) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }

      const employee = await Employee.create({
        ...req.body,
        role: req.body.roleId,
        firmId: req.body.firmId,
        designation: req.body.designationId,
      });
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.update({
          ...req.body,
          roleId: req.body.roleId,
          firmId: req.body.firmId,
          designationId: req.body.designationId,
        });
        res.json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id, {
        include: [Role, Firm, Designation],
      });

      if (employee) {
        // Optionally, you can perform additional actions before deleting, such as logging or unlinking associations
        await employee.destroy();
        res.status(204).send(); // No content to send back
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EmployeeController();
