const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { Firm } = require("./firm.model");

const BilliingTypes = Object.freeze({
  MONTHLY: "monthly",
  ANNUALLY: "annually",
});
const Subscription = sequelize.define(
  "Subscription",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    monthlyPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    yearlyPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    yearlyDiscountPercentage: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    features: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    discountPercentage: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "INR",
    },
    orderLimit: DataTypes.INTEGER,
    cancellationPolicy: DataTypes.TEXT,
    additionalNotes: DataTypes.TEXT,
    trialPeriod: DataTypes.INTEGER,

    // Additional fields as needed...
  },
  {
    timestamps: true,
  }
);

const FirmSubscription = sequelize.define(
  "FirmSubscription",
  {
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    trialStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    trialEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    nextBillingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastBillingDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    billingCycle: {
      type: DataTypes.ENUM(...Object.values(BilliingTypes)),
      allowNull: false,
    },

    // Additional fields as needed...
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["FirmId"],
      },
    ],
  }
);

FirmSubscription.belongsTo(Subscription);
FirmSubscription.belongsTo(Firm);

module.exports = { Subscription, FirmSubscription, BilliingTypes };
