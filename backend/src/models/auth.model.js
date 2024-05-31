const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file

const OtpTYpe = Object.freeze({
  LOGIN: "login",
  SIGNUP: "signup",
  SETTING: "setting",
});

// Define the Auth model
const Auth = sequelize.define(
  "Auth",
  {
    mobileNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
    },
    otpType: {
      type: DataTypes.ENUM(...Object.values(OtpTYpe)),
      defaultValue: OtpTYpe.SIGNUP,
    },
    otpValue: DataTypes.STRING,
    otpExpiresAt: DataTypes.DATE,
    cooldownUntil: DataTypes.DATE,
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
        fields: ["mobileNumber", "otpType"],
      },
    ],
  }
);
// Auth.sync({ alter: true });
module.exports = { Auth };
