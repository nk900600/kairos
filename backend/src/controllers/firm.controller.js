const { Op } = require("sequelize");
const sequelize = require("../db/db.js");
const { Employee } = require("../models/employee.model.js");
const { Firm } = require("../models/firm.model.js");
const { Leave, LeaveType } = require("../models/leave.model.js");
const { MenuItem, Category } = require("../models/menuItem.model.js");
const { Order } = require("../models/order.model.js");
const { FirmSubscription } = require("../models/subscription.model.js");
const { Table } = require("../models/table.model.js");
const { TableSession } = require("../models/tableSession.model.js");
const { s3 } = require("../utils/aws-obj.js");
const { mobileNumberRegex } = require("../utils/const.js");
const fs = require("fs");
const RefreshToken = require("../models/refreshTokens.model.js");
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
      await sequelize.query('CALL DeleteFirmData(:firmId)', {
        replacements: { firmId }
      });
      res.send("Firm deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting firm");
    }
  }
  async uploadImage(req, res) {
    try {
      const fileContent = fs.readFileSync(req.file.path);
      const params = {
        Bucket: "kairos-userpics",
        Key: req.file.originalname,
        Body: fileContent,
        ACL: "private",
        Expires: 36000,
      };

      s3.upload(params, async (err, data) => {
        // Delete the file from the local uploads folder
        fs.unlinkSync(req.file.path);
        if (err) {
          return res.status(500).json({ error: err });
        }

        const params = {
          Bucket: "kairos-userpics",
          Key: data.key,
          Expires: 504800, // URL valid for 10 years
        };

        s3.getSignedUrl("getObject", params, async (err, url) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          await Firm.update(
            {
              image: url,
            },
            { where: { id: req.user.firmId } },
            { userId: req.user.id }
          );
          return res.json({
            message: "File uploaded successfully",
            url: url,
          });
        });
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new FirmController();
