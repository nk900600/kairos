const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file

// Define the Auth model
const Auth = sequelize.define(
  "Auth",
  {
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{10}$/, // Example regex for a 10-digit mobile number
      },
    },
    otpValue: DataTypes.STRING,
    otpExpiresAt: DataTypes.DATE,
    failedOtpCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastOtpAttempt: DataTypes.DATE,
    ipAddress: DataTypes.STRING, // Additional column for IP address
    deviceInfo: DataTypes.STRING, // Additional column for device information
    region: DataTypes.STRING, // Additional column for region
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["mobileNumber"],
      },
    ],
  }
);
// Auth.sync({});
module.exports = { Auth };
