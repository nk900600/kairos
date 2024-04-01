const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const {
  MenuItem,
  Customization,
  CustomizationChoice,
} = require("./menuItem.model");
const { TableSession } = require("./tableSession.model");
const { SpiceLevel, DietType } = require("../utils/const");

const OrderTypes = Object.freeze({
  DINE_IN: "dine-in",
  TAKEAWAY: "takeaway",
});

const OrderStatuses = Object.freeze({
  ADDED_TO_ORDER: "Added to Order",
  MODIFIED: "Modified",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  READY_FOR_PICKUP: "Ready for Pickup",
  CANCELLED: "Cancelled",
  SERVED: "Served",
  COMPLETED: "Completed",
});

// Define the OrderItem model
const OrderItem = sequelize.define(
  "OrderItem",
  {
    quantity: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR", // Set a default currency if applicable
    },
    specialInstructions: DataTypes.STRING,
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Set a default currency if applicable
    },

    // Foreign keys for menuItem and customizations will be added below
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["OrderId", "MenuItemId"],
      },
    ],
  }
);

// Define the Order model
const Order = sequelize.define(
  "Order",
  {
    totalAmount: DataTypes.INTEGER,
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
      type: DataTypes.ENUM(...Object.values(OrderStatuses)),
      defaultValue: OrderStatuses.ADDED_TO_ORDER,
      allowNull: false,
    },
    isPriority: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    orderType: {
      type: DataTypes.ENUM(...Object.values(OrderTypes)),
      defaultValue: OrderTypes.DINE_IN,
      allowNull: false,
    },
    customerNotes: DataTypes.STRING,
    promoCodeApplied: DataTypes.STRING,
    discountAmount: {
      type: DataTypes.INTEGER,
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
  },
  {
    timestamps: true,
  }
);

// Define associations
Order.hasMany(OrderItem, {
  as: "orderItems",
  onDelete: "CASCADE",
  foreignKey: "OrderId",
});
Order.belongsTo(TableSession, { foreignKey: "tableSessionId" });
// Order.sync({ force: true });

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
const OrderItemCustomizationsChoice = sequelize.define(
  "OrderItemCustomizationsChoices",
  {
    // Define any additional fields if needed
  }
);

OrderItem.belongsToMany(CustomizationChoice, {
  through: OrderItemCustomizationsChoice,
});

// Order.sync({ force: true });
// OrderItem.sync({ force: true });
// OrderItemCustomizationsChoices.sync({ force: true });
module.exports = { Order, OrderItem, OrderItemCustomizationsChoice };
