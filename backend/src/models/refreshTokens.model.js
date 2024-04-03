const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    token: {
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Employees", // Assumes you have a Users table
        key: "id",
      },
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// RefreshToken.sync({ alter: true });

module.exports = RefreshToken;
