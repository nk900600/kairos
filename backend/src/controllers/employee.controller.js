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
const { getRandomGradient } = require("../utils/colorGradient.js");

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

      const user = await Employee.findOne({
        where: { mobileNumber: req.body.mobileNumber },
      });
      // // Restore the user
      if (user) {
        return res
          .status(400)
          .json({ message: "User is already registered with different Shop" });
      }

      const employee = await Employee.create(
        {
          ...req.body,
          roleId: req.body.role,
          firmId: req.user.firmId,
          designationId: req.body.designation,
          userPic: getRandomGradient(),
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
  async createEmployeeBulk(req, res) {
    const transaction = await sequelize.transaction();
    try {
      if (!req.body?.length) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const firm = await Firm.findByPk(req.user.firmId);
      // Create All desginations

      const excelEmployees = req.body;
      let desginations = excelEmployees.map((val) => {
        if (val.mobileNumber && !mobileNumberRegex.test(val.mobileNumber)) {
          return res
            .status(400)
            .json({ message: "Invalid mobile number format" });
        }

        return val.desginationName;
      });

      await Designation.bulkCreate(
        desginations.map((val) => ({
          title: val,
          firmTypeId: firm.type,
          firmId: req.user.firmId,
        })),
        { transaction, ignoreDuplicates: true }
      );

      const designations = await Designation.findAll({
        where: {
          [Op.or]: [{ firmTypeId: firm.type }, { firmId: req.user.firmId }],
        },
        transaction,
      });
      // res.json(designations);

      let designationMap = {};

      designations.forEach((val) => {
        designationMap[val.title] = val.id;
      });

      // Step 1: Retrieve all existing mobile numbers for the firm
      const existingEmployees = await Employee.findAll({
        where: { firmId: req.user.firmId },
        attributes: ["mobileNumber"],
        raw: true,
      });

      const existingMobileNumbers = new Set(
        existingEmployees.map((emp) => emp.mobileNumber)
      );

      // Step 2: Filter out employees with already registered mobile numbers
      const newEmployees = excelEmployees.filter(
        (employee) => !existingMobileNumbers.has(employee.mobileNumber)
      );

      if (newEmployees.length !== excelEmployees.length) {
        return res.status(400).json({
          message:
            "Some Users were already registered with same mobile numbers",
        });
      }

      await Employee.bulkCreate(
        newEmployees.map((employee) => {
          return {
            firstName: employee.firstName,
            lastName: employee?.lastName,
            mobileNumber: employee?.mobileNumber,
            designationId: designationMap[employee.desginationName],
            roleId: employee.role,
            firmId: req.user.firmId,
            userPic: getRandomGradient(),
          };
        }),
        { userId: req.user.id, transaction, individualHooks: true }
      );

      // Step 4: Retrieve all employees to create a mapping
      const allEmployees = await Employee.findAll({
        where: { firmId: req.user.firmId },
        attributes: ["id", "firstName", "lastName", "mobileNumber"],
        raw: true,
        transaction,
      });

      const employeeMap = new Map();
      allEmployees.forEach((emp) => {
        employeeMap.set(`${emp.firstName} ${emp.lastName}`, emp.id);
      });

      // Step 5: Update employees with their manager IDs
      for (const employee of newEmployees) {
        if (employee.managerFirstName && employee.managerLastName) {
          const managerFullName = `${employee.managerFirstName} ${employee.managerLastName}`;
          if (employeeMap.has(managerFullName)) {
            const managerId = employeeMap.get(managerFullName);
            await Employee.update(
              { managerId: managerId },
              { where: { mobileNumber: employee.mobileNumber }, transaction }
            );
          }
        }
      }

      const newBulkEmployees = await Employee.findAll({
        where: { firmId: req.user.firmId },
        transaction,
      });
      await transaction.commit();

      return res.status(201).json({ newBulkEmployees, designations });
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
    try {
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
