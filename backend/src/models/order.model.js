const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const { MenuItem, Customization } = require("./menuItem.model");
const { TableSession } = require("./tableSession.model");

// Define the OrderItem model
const OrderItem = sequelize.define("OrderItem", {
  quantity: DataTypes.INTEGER,
  amount: DataTypes.DECIMAL(10, 2),
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "INR", // Set a default currency if applicable
  },
  specialInstructions: DataTypes.STRING,

  // Foreign keys for menuItem and customizations will be added below
});

// Define the Order model
const Order = sequelize.define(
  "Order",
  {
    tableNumber: DataTypes.INTEGER,
    totalAmount: DataTypes.DECIMAL(10, 2),
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR", // Set a default currency if applicable
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM(
        "Placed",
        "Modified",
        "Confirmed",
        "Preparing",
        "Ready for Pickup",
        "Delivered",
        "Cancelled"
      ),
      defaultValue: "Placed",
      allowNull: false,
    },
    isPriority: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    customerNotes: DataTypes.STRING,
    promoCodeApplied: DataTypes.STRING,
    discountAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
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
    // Foreign key for handledBy will be added below
  },
  {
    timestamps: true,
    paranoid: true,
    deletedAt: "removedAt",
  }
);

// Define associations
Order.hasMany(OrderItem, { as: "items" });
Order.belongsTo(TableSession, { foreignKey: "tableSessionId" });
// Order.sync({});

Order.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});

Order.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});

Order.beforeDestroy((table, options) => {
  if (options.userId) {
    table.removedBy = options.userId;
    // Since we're performing a soft delete, we need to manually save the update
    return table.save();
  }
});

OrderItem.belongsTo(Order);

// Assuming you have defined MenuItem and Customization models
OrderItem.belongsTo(MenuItem);
OrderItem.belongsToMany(Customization, { through: "OrderItemCustomizations" });
// OrderItem.sync({});

module.exports = { Order, OrderItem };
