// const mongoose = require("mongoose");

const CategoryType = Object.freeze({
  APPETIZER: "Appetizer",
  SOUP: "Soup",
  DRINK: "Drink",
});
const SpiceLevel = Object.freeze({
  MILD: "Mild",
  MEDIUM: "Medium",
  SPICY: "Spicy",
  VERYSPICY: "Very Spicy",
});

const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file

// Define the Customization model
const Customization = sequelize.define("Customization", {
  name: DataTypes.STRING,
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isMultiselect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // Choices will be handled separately
});

// Define the MenuItem model
const MenuItem = sequelize.define(
  "MenuItem",
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR", // Set a default currency if applicable
    },
    category: {
      type: DataTypes.ENUM(
        CategoryType.APPETIZER,
        CategoryType.DRINK,
        CategoryType.SOUP
      ),
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    spiceLevel: {
      type: DataTypes.ENUM(
        SpiceLevel.MEDIUM,
        SpiceLevel.MILD,
        SpiceLevel.SPICY,
        SpiceLevel.VERYSPICY
      ),
      defaultValue: "Mild",
    },
    isVegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isNonVegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVegan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    imageUrl: DataTypes.STRING,
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

// Define associations
// MenuItem.belongsToMany(Customization, { through: "MenuItemCustomizations" });
// Customization.belongsToMany(MenuItem, { through: "MenuItemCustomizations" });
MenuItem.hasMany(Customization, { foreignKey: "menuItemId" });

MenuItem.beforeCreate((table, options) => {
  table.createdBy = options.userId;
});

MenuItem.beforeUpdate((table, options) => {
  console.log("testing update hook");
  table.updatedBy = options.userId;
});

MenuItem.beforeDestroy((table, options) => {
  if (options.userId) {
    table.removedBy = options.userId;
    // Since we're performing a soft delete, we need to manually save the update
    return table.save();
  }
});

const CustomizationChoice = sequelize.define("CustomizationChoice", {
  option: DataTypes.STRING,
  additionalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
});

CustomizationChoice.belongsTo(Customization);
Customization.hasMany(CustomizationChoice);

Customization.belongsTo(MenuItem, { foreignKey: "menuItemId" });
module.exports = { MenuItem, Customization, CustomizationChoice };
