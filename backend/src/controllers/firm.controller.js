const { Firm } = require("../models/firm.model.js");
const { mobileNumberRegex } = require("../utils/const.js");

class FirmController {
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

  async updateFirm(req, res) {
    try {
      if (
        req.body?.mobileNumber &&
        !mobileNumberRegex.test(req.body?.mobileNumber)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }

      const firmId = req.params.id;
      const firm = await Firm.findByPk(firmId);
      if (!firm) {
        return res.status(404).send("Firm not found");
      }
      await firm.update(req.body, { userId: req.user.id });
      res.json(firm);
    } catch (error) {
      console.error("Error updating firm:", error);
      res.status(500).send("Error updating firm");
    }
  }

  //TODO: need to remove all rows and data associated with this firm
  async deleteFirm(req, res) {
    try {
      const firmId = req.params.id;
      const firm = await Firm.findByPk(firmId);
      if (!firm) {
        return res.status(404).send("Firm not found");
      }
      await firm.destroy({ userId: req.user.id });
      res.send("Firm deleted successfully");
    } catch (error) {
      console.error("Error deleting firm:", error);
      res.status(500).send("Error deleting firm");
    }
  }
}

module.exports = new FirmController();
