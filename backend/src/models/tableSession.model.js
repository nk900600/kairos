const { DataTypes } = require("sequelize");
const { Table } = require("./table.model");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const { Order } = require("./order.model");

const PaymentStatus = {
  PENDING: "pending",
  PAID: "Paid",
  UNPAID: "Unpaid",
};
const PaymentMethod = {
  CASH: "Cash",
  ONLINE: "Online",
};
const SessionStatus = {
  ACTIVE: "Active",
  CLOSE: "Close",
  WAITINGFORPAYMENT: "Waiting for Payment",
};

// Define the TableSession model
const TableSession = sequelize.define(
  "TableSession",
  {
    // Foreign keys for tableNumber, handlerId, and orders will be added below
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    endTime: DataTypes.DATE,
    totalAmount: DataTypes.INTEGER,

    // Will create new custier table once MVP is out
    customerName: DataTypes.STRING,
    customerMobile: DataTypes.INTEGER,

    orderCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    partySize: DataTypes.INTEGER,
    paymentStatus: {
      type: DataTypes.ENUM(...Object.values(PaymentStatus)),
      defaultValue: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: DataTypes.ENUM(...Object.values(PaymentMethod)),
      defaultValue: PaymentMethod.CASH,
    },
    specialRequests: DataTypes.STRING,
    serviceNotes: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM(...Object.values(SessionStatus)),
      defaultValue: SessionStatus.ACTIVE,
    },
    // whole new feature
    feedback: DataTypes.STRING, //
    foodRating: DataTypes.INTEGER,
    serviceRating: DataTypes.INTEGER,
    overallRating: DataTypes.INTEGER,

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
  }
);
// Define associations
TableSession.belongsTo(Table, { as: "table" });
// TableSession.hasMany(Order);

// TableSession.sync({ alter: true });
TableSession.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});

TableSession.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});

// TableSession.sync({});
module.exports = { TableSession, SessionStatus, PaymentMethod, PaymentStatus };
