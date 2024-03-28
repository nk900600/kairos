const { Role } = require("../models/employee.model");

class RoleController {
  async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      res.json(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).send("Error fetching roles");
    }
  }

  async createRole(req, res) {
    try {
      const { name } = req.body;
      const role = await Role.create({ name });
      res.status(201).json(role);
    } catch (error) {
      console.error("Error creating role:", error);
      res.status(500).send("Error creating role");
    }
  }

  async deleteRole(req, res) {
    try {
      const roleId = req.params.id;
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(404).send("Role not found");
      }
      await role.destroy();
      res.send("Role deleted successfully");
    } catch (error) {
      console.error("Error deleting role:", error);
      res.status(500).send("Error deleting role");
    }
  }
}

module.exports = new RoleController();
