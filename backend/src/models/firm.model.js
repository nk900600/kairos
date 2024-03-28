const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file

// const FrimType = Object.freeze({
//   RESTURANT: "Resturant",
// });

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
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    website: DataTypes.STRING,

    // You can add more fields as needed, such as opening hours, description, etc.
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: "removedAt",
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
