const { Role } = require("../models/employee.model"); // Adjust the path to your models

const basicRoles = ["Admin", "Manager", "User", "Guest"];

async function initializeRoles() {
  try {
    for (const roleName of basicRoles) {
      const roleExists = await Role.findOne({ where: { name: roleName } });

      if (!roleExists) {
        await Role.create({ name: roleName });
      }
    }
    console.log("Basic roles initialized successfully");
  } catch (error) {
    console.error("Error initializing basic roles:", error);
  }
}

module.exports = initializeRoles;
