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
  async getAllFirmsByMobile(req, res) {
    try {
      const { mobileNumber } = req.query;

      if (!mobileNumber) {
        return res.status(400).json({ error: "Mobile number is required" });
      }
      const firms = await Firm.findAll({
        where: {
          mobileNumber: mobileNumber,
        },
      });

      res.status(200).json(firms);
    } catch (error) {
      console.error("Error fetching firms:", error);
      res.status(500).json({ error: "An error occurred while fetching firms" });
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
    const transaction = await sequelize.transaction();

    try {
      const firmId = req.params.id;
      await Leave.destroy({ where: { firmId: firmId } }, { transaction });
      await LeaveType.destroy({ where: { firmId: firmId } }, { transaction });
      await MenuItem.destroy({ where: { firmId: firmId } }, { transaction });
      await Category.destroy({ where: { firmId: firmId } }, { transaction });
      await Order.destroy({ where: { firmId: firmId } }, { transaction });
      await FirmSubscription.destroy(
        { where: { FirmId: firmId } },
        { transaction }
      );
      await TableSession.destroy(
        { where: { firmId: firmId } },
        { transaction }
      );
      await Table.destroy({ where: { firmId: firmId } }, { transaction });

      const employees = await Employee.findAll({
        where: {
          firmId: firmId,
        },
        attributes: ["id"], // Only select the ID attribute
        transaction,
      });

      const employeeIds = employees.map((employee) => employee.id);

      await RefreshToken.destroy({
        where: {
          employeeId: {
            [Op.in]: employeeIds,
          },
        },
        transaction,
      });

      await Employee.destroy({
        where: {
          id: {
            [Op.in]: employeeIds,
          },
        },
        transaction,
      });

      await Firm.destroy({
        where: {
          id: {
            [Op.in]: [firmId],
          },
        },
        transaction,
      });
      await transaction.commit();
      res.send("Firm deleted successfully");
    } catch (error) {
      transaction.rollback();
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
