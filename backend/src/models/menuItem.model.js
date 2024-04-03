// const mongoose = require("mongoose");

const { DataTypes } = require("sequelize");
const sequelize = require("../db/db"); // Adjust the path to your database configuration file
const { SpiceLevel, DietType } = require("../utils/const");

// Define the Customization model
const Customization = sequelize.define("Customization", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  isRequired: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isMultiselect: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  maxMultiSelect: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
  },
  // Choices will be handled separately
});

// Define the MenuItem model
const MenuItem = sequelize.define(
  "MenuItem",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.STRING,
    calorieCount: DataTypes.INTEGER,
    price: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "INR", // Set a default currency if applicable
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "CategoryTypes", // Assumes you have a Users table
        key: "id",
      },
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
      defaultValue: null,
    },
    dietType: {
      type: DataTypes.ENUM(...Object.values(DietType)),
      defaultValue: null,
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
  },
  {
    timestamps: true,
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
  table.updatedBy = options.userId;
});

const CustomizationChoice = sequelize.define("CustomizationChoice", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  additionalPrice: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "INR", // Set a default currency if applicable
  },
  dietType: {
    type: DataTypes.ENUM(...Object.values(DietType)),
    defaultValue: DietType.VEGETARIAN,
  },
});

const Category = sequelize.define("CategoryType", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  firmTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "FirmTypes", // Assumes you have a Users table
      key: "id",
    },
  },
  firmId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Firms", // Assumes you have a Users table
      key: "id",
    },
  },
});

CustomizationChoice.belongsTo(Customization), { foreignKey: "customizationId" };
Customization.hasMany(CustomizationChoice);

Customization.belongsTo(MenuItem, {
  foreignKey: "menuItemId",
  allowNull: false,
});
module.exports = { MenuItem, Customization, CustomizationChoice, Category };
