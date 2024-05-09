const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");
const { MenuItem, CustomizationChoice } = require("./menuItem.model");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    menuItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "MenuItems",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    tableSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "TableSessions", // Assumes you have a Users table
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
    tableName: "cart_items",
  }
);

CartItem.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});

CartItem.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});

const CartItemCustomization = sequelize.define(
  "CartItemCustomization",
  {
    cartItemId: {
      type: DataTypes.INTEGER,
      references: {
        model: "cart_items",
        key: "id",
      },
    },
    customizationChoiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: "CustomizationChoices",
        key: "id",
      },
    },
  },
  {
    tableName: "cart_item_customizations",
  }
);

// MenuItem has many CartItems
MenuItem.hasMany(CartItem, { foreignKey: "menuItemId" });
CartItem.belongsTo(MenuItem, { foreignKey: "menuItemId" });

// CartItem has many CartItemCustomizations
CartItem.hasMany(CartItemCustomization, { foreignKey: "cartItemId" });
CartItemCustomization.belongsTo(CartItem, { foreignKey: "cartItemId" });

// CustomizationOption has many CartItemCustomizations
CustomizationChoice.hasMany(CartItemCustomization, {
  foreignKey: "customizationChoiceId",
});
CartItemCustomization.belongsTo(CustomizationChoice, {
  foreignKey: "customizationChoiceId",
});

// CartItemCustomization.sync({ alter: true });
// CartItem.sync({ alter: true });

module.exports = { CartItemCustomization, CartItem };
