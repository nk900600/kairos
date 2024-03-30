const { Employee, Designation, Role } = require("../models/employee.model.js");
const { Firm } = require("../models/firm.model.js");
const { mobileNumberRegex, emailRegex } = require("../utils/const.js");

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [Firm, Designation],
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
      if (!mobileNumberRegex.test(req.body?.mobileNumber)) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }
      // Validate the email
      if (!emailRegex.test(req.body?.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const employee = await Employee.create(
        {
          ...req.body,
          roleId: req.body.role,
          firmId: req.body.firmId,
          designationId: req.body.designation,
        },
        { userId: 1 }
      );
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (employee) {
        await employee.update(
          {
            ...req.body,
            roleId: req.body.roleId,
            firmId: req.body.firmId,
            designationId: req.body.designationId,
          },
          { userId: 1 }
        );
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
        include: [Firm, Designation],
      });
      console.log(employee);
      if (employee) {
        // Optionally, you can perform additional actions before deleting, such as logging or unlinking associations
        await employee.destroy({ userId: 1 });
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
