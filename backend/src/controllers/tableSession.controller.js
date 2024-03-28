const { TableSession } = require("../models/tableSession.model.js");

class TableSessionController {
  async createSession(req, res) {
    try {
      const tableSessions = await TableSession.create(req.body);
      res.status(201).json(tableSessions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSession(req, res) {
    try {
      const tableSessions = await TableSession.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(tableSessions);
    } catch (error) {
      res.status(404).json({ error: "Table not found" });
    }
  }
}

module.exports = new TableSessionController();
