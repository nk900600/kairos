const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { TableStatus } = require("../enums/tables.enum");
const Table = sequelize.define(
  "Table",
  {
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["tableName", "firmId"],
      },
    ],
  }
);

Table.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});

Table.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});
// Table.sync({ alter: true });

module.exports = { Table };
