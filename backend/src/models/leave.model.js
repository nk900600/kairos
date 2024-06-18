const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const { Employee } = require("./employee.model");

const LeaveStatus = Object.freeze({
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
});

const LeaveDurationType = Object.freeze({
  PENDING: "Pending",
  FULL_DAY: "Full Day",
  HALF_DAY: "Half Day",
});

// Define the LeaveType model
const LeaveType = sequelize.define(
  "LeaveType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: DataTypes.STRING,
    numLeavesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Firms", // Assumes you havei a Users table
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees", // Assumes you have a Users table
        key: "id",
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Define the Leave model
const Leave = sequelize.define(
  "Leave",
  {
    // Foreign keys for employeeId and leaveType will be added below
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(LeaveStatus)),
      defaultValue: LeaveStatus.PENDING,
    },
    appliedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // Foreign key for managerId will be added below
    comments: DataTypes.STRING,
    leaveDurationType: {
      type: DataTypes.ENUM(...Object.values(LeaveDurationType)),
      allowNull: false,
      defaultValue: LeaveDurationType.FULL_DAY,
    },
    firmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Firms", // Assumes you have a Users table
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees", // Assumes you have a Users table
        key: "id",
      },
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Define associations
Leave.belongsTo(LeaveType);
Leave.belongsTo(Employee, { as: "manager", allowNull: false });

Leave.beforeCreate((leave, options) => {
  leave.createdBy = options.userId;
});

Leave.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});

// Leave.sync({ alter: true });
// LeaveType.sync({});
module.exports = { Leave, LeaveType, LeaveStatus, LeaveDurationType };
