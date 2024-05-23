const sequelize = require("../db/db.js");
const { Employee, Designation, Role } = require("../models/employee.model.js");
const { Firm } = require("../models/firm.model.js");
const {
  Subscription,
  FirmSubscription,
} = require("../models/subscription.model.js");
const { s3 } = require("../utils/aws-obj.js");
const { mobileNumberRegex, emailRegex } = require("../utils/const.js");
const { Op } = require("sequelize");
const moment = require("moment");
const fs = require("fs");
const { calculatePercentageChange } = require("../utils/percentageCount.js");

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employee.findAll({
        include: [Role, Firm, Designation],
        where: { firmId: req.user.firmId },
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
          firmId: req.user.firmId,
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
        include: [{ model: Subscription }],
      });
      return res.status(200).json({ employee: isEmployee, subscripition }); //
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async uploadUserPic(req, res) {
    try {
      console.log(req.file.path);
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
        console.log(data);
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
          await Employee.update(
            {
              userPic: url,
            },
            { where: { id: req.user.id } },
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

  async GetEmployeesBetweenDatesRange(req, res) {
    const { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      const previousMonthStart = moment()
        .subtract(1, "month")
        .startOf("month")
        .toDate();
      const previousMonthEnd = moment()
        .subtract(1, "month")
        .endOf("month")
        .toDate();

      // Query the database for average ratings
      const employees = await Employee.count({
        where: {
          firmId: req.user.firmId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      const employeesPreviousMonth = await Employee.count({
        where: {
          firmId: req.user.firmId,
          createdAt: {
            [Op.between]: [previousMonthStart, previousMonthEnd],
          },
        },
      });

      // Calculate the percentage changeconte
      const percentageChange = calculatePercentageChange(
        employees,
        employeesPreviousMonth
      );
      return res
        .status(200)
        .json({ count: employees, percentage: percentageChange.toFixed(1) });
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new EmployeeController();
