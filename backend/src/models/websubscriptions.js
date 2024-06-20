const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const WebSubscription = sequelize.define(
  "webSubscriptions",
  {
    endpoint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keys: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Designations",
        key: "id",
      },
    },

    firmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Firms",
        key: "id",
      },
    },
  },
  {
    tableName: "webSubscriptions",
    timestamps: true,
  }
);

// WebSubscription.sync({ alter: true });
module.exports = { WebSubscription };
