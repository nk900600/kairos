const { Op } = require("sequelize");
const { Designation } = require("../models/employee.model");
const { Firm } = require("../models/firm.model");

class DesignationController {
  // Create a new designation
  static async createDesignation(req, res) {
    try {
      if (!req.body?.title) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const { title } = req.body;
      const firm = await Firm.findByPk(req.user.firmId);

      const designation = await Designation.create({
        title,
        firmTypeId: firm.dataValues.type,
        firmId: req.user.firmId,
      });
      return res.status(201).json(designation);
    } catch (error) {
      return res
        .status(400)
        .json({ error: error + "Error creating designation" });
    }
  }

  // Get all designations
  static async getAllDesignations(req, res) {
    try {
      const firm = await Firm.findOne({
        where: { id: req.user.firmId },
      });
      const designations = await Designation.findAll({
        where: { firmTypeId: firm.type },
        // where: {
        //   firmId: {
        //     [Op.in]: [req.user.firmId],
        //   },
        // },
      });
      res.json(designations);
    } catch (error) {
      res.status(500).json({ error: "Error fetching designations" });
    }
  }
}

module.exports = DesignationController;
