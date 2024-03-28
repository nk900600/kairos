const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { TableStatus } = require("../enums/tables.enum");
const Table = sequelize.define(
  "Table",
  {
    tableNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: [
        TableStatus.AVAILABLE,
        TableStatus.CLEANING,
        TableStatus.MAINTENANCE,
        TableStatus.OCCUPIED,
        TableStatus.RESERVED,
      ],
      defaultValue: TableStatus.AVAILABLE,
    },
    reservationName: {
      type: DataTypes.STRING,
    },
    reservationTime: {
      type: DataTypes.DATE,
    },
    reservationPartySize: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Set to true if the image is optional
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
// Table.sync({});

Table.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});

Table.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});

Table.beforeDestroy((table, options) => {
  if (options.userId) {
    table.removedBy = options.userId;
    // Since we're performing a soft delete, we need to manually save the update
    return table.save();
  }
});

module.exports = { Table };
