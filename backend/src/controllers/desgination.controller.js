const { Designation } = require("../models/employee.model");

class DesignationController {
  // Create a new designation
  static async createDesignation(req, res) {
    try {
      if (!req.body?.title) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const { title } = req.body;
      const designation = await Designation.create({
        title,
        firmTypeId: 1,
        firmId: 1,
      });
      return res.status(201).json(designation);
    } catch (error) {
      return res.status(400).json({ error: "Error creating designation" });
    }
  }

  // Get all designations
  static async getAllDesignations(req, res) {
    try {
      const designations = await Designation.findAll();
      res.json(designations);
    } catch (error) {
      res.status(500).json({ error: "Error fetching designations" });
    }
  }
}

module.exports = DesignationController;
