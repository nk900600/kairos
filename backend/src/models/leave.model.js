const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const { Employee } = require("./employee.model");

// Define the LeaveType model
const LeaveType = sequelize.define(
  "LeaveType",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    removedBy: {
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
    paranoid: true,
    deletedAt: "removedAt",
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
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
    appliedOn: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // Foreign key for managerId will be added below
    comments: DataTypes.STRING,
    leaveDurationType: {
      type: DataTypes.ENUM("Full Day", "Half Day"),
      allowNull: false,
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
    removedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    // Additional fields for halfDayDetails and attachments can be added as needed
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: "removedAt",
  }
);

// Define associations
Leave.belongsTo(LeaveType);
Leave.belongsTo(Employee, { as: "employee" });
Leave.belongsTo(Employee, { as: "manager" });
// Leave.sync({});
// LeaveType.sync({});
module.exports = { Leave, LeaveType };
