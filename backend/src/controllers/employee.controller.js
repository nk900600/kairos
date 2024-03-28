const { Employee } = require("../models/employee.model.js");

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.aggregate([
        {
          $lookup: {
            from: "roles", // The collection to join with
            localField: "role", // The field from the input documents
            foreignField: "_id", // The field from the documents of the "from" collection
            as: "role", // The output array field with the joined documents
          },
        },
        {
          $lookup: {
            from: "designations", // The collection to join with
            localField: "designation", // The field from the input documents
            foreignField: "_id", // The field from the documents of the "from" collection
            as: "designation", // The output array field with the joined documents
          },
        },
      ]);
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      res.status(200).json(employee);
    } catch (error) {
      res.status(404).json({ error: "Employee not found" });
    }
  }

  async createEmployee(req, res) {
    try {
      const employee = await Employee.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEmployee(req, res) {
    try {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(employee);
    } catch (error) {
      res.status(404).json({ error: "Employee not found" });
    }
  }

  async deleteEmployee(req, res) {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Employee not found" });
    }
  }
}

module.exports = new EmployeeController();
