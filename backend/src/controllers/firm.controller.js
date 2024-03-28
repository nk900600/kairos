const { Firm } = require("../models/firm.model.js");

class FirmController {
  async getAllFirms(req, res) {
    try {
      const firms = await Firm.findAll();
      res.json(firms);
    } catch (error) {
      console.error("Error fetching firms:", error);
      res.status(500).send("Error fetching firms");
    }
  }

  async getFirmById(req, res) {
    try {
      const firmId = req.params.id;
      const firm = await Firm.findByPk(firmId);
      if (!firm) {
        return res.status(404).send("Firm not found");
      }
      return res.json(firm);
    } catch (error) {
      console.error("Error updating firm:", error);
      res.status(500).send("Error updating firm");
    }
  }

  async createFirm(req, res) {
    try {
      const firm = await Firm.create(req.body);
      res.status(201).json(firm);
    } catch (error) {
      console.error("Error creating firm:", error);
      res.status(500).send("Error creating firm");
    }
  }

  async updateFirm(req, res) {
    try {
      const firmId = req.params.id;
      const firm = await Firm.findByPk(firmId);
      if (!firm) {
        return res.status(404).send("Firm not found");
      }
      await firm.update(req.body);
      res.json(firm);
    } catch (error) {
      console.error("Error updating firm:", error);
      res.status(500).send("Error updating firm");
    }
  }

  async deleteFirm(req, res) {
    try {
      const firmId = req.params.id;
      const firm = await Firm.findByPk(firmId);
      if (!firm) {
        return res.status(404).send("Firm not found");
      }
      await firm.destroy();
      res.send("Firm deleted successfully");
    } catch (error) {
      console.error("Error deleting firm:", error);
      res.status(500).send("Error deleting firm");
    }
  }
}

module.exports = new FirmController();
