const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { Firm } = require("./firm.model");

// Define the Employee model
const Employee = sequelize.define(
  "Employee",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPic: {
      type: DataTypes.STRING(750),
    },
    mobileNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    street: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    emergencyContactName: {
      type: DataTypes.STRING,
    },
    emergencyContactRelationship: {
      type: DataTypes.STRING,
    },
    emergencyContactPhone: {
      type: DataTypes.STRING,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees",
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
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Roles",
        key: "id",
      },
    },
    designationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Designations",
        key: "id",
      },
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Employees",
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
    // paranoid: true,
    deletedAt: "removedAt",
    indexes: [
      {
        unique: true,
        fields: ["firmId", "mobileNumber"],
      },
    ],
  }
);

// Define the Role model
const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Define the Designation model
const Designation = sequelize.define(
  "Designation",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["firmId", "firmTypeId", "title"],
      },
    ],
  }
);
// Define the Document model
const Document = sequelize.define("Document", {
  // Document fields
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Employees", // Name of the Employee model
      key: "id", // Primary key of the ¯¯ßßEmployee model
    },
  },
});

// Hooks
Employee.beforeCreate(async (employee, options) => {
  employee.createdBy = options.userId;
  // if not owner
  if (employee?.roleId !== 1 ) {
    const existingAssignments = await Employee.count({ where: { mobileNumber: employee.mobileNumber } });
    if (existingAssignments > 0) {
      throw new Error('An employee can not be assigned to multiple shop.');
    }
  }

});
Employee.beforeUpdate((table, options) => {
  table.updatedBy = options.userId;
});
Employee.beforeDestroy((table, options) => {
  if (options.userId) {
    table.removedBy = options.userId;
    return table.save();
  }
});

Employee.belongsTo(Firm, { foreignKey: "firmId" });
Employee.belongsTo(Role, { foreignKey: "roleId" });
Employee.belongsTo(Designation, { foreignKey: "designationId" });
// Employee.sync({ alter: true });
module.exports = { Employee, Role, Document, Designation };
