const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const { Employee } = require("./employee.model");

const Firm = sequelize.define(
  "Firm",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "FirmTypes", // Assumes you have a Users table
        key: "id",
      },
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    mobileNumber: DataTypes.STRING,
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    website: DataTypes.STRING,

    // You can add more fields as needed, such as opening hours, description, etc.
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: "removedAt",
    indexes: [
      {
        unique: true,
        fields: ["email", "name"],
      },
    ],
  }
);
// Firm.sync({});

const FirmType = sequelize.define("FirmType", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: DataTypes.STRING,
});

Firm.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});
Firm.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});
Firm.beforeDestroy((table, options) => {
  if (options.userId) {
    table.removedBy = options.userId;
    return table.save();
  }
});

// FirmType.sync({});
module.exports = { Firm, FirmType };
