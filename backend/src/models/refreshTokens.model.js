const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const RefreshToken = sequelize.define(
  "RefreshToken",
  {
    token: {
      type: DataTypes.STRING,
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

// Have to do manaully
// ALTER TABLE `RefreshTokens`
// MODIFY COLUMN `token` LONGTEXT NOT NULL;

// sequelize
//   .query(
//     `
//   ALTER TABLE RefreshTokens
//   MODIFY COLUMN token NVARCHAR(MAX) NOT NULL UNIQUE;
// `
//   )
//   .then(() => {
//     console.log("Column type changed successfully.");
//   })
//   .catch((error) => {
//     console.error("Error changing column type:", error);
//   });

// RefreshToken.sync({ alter: true });
//
module.exports = RefreshToken;
