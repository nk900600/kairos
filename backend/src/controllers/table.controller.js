const { Table } = require("../models/table.model.js");
const {
  TableSession,
  SessionStatus,
} = require("../models/tableSession.model.js");

class TableController {
  async getAllTables(req, res) {
    try {
      const tables = await Table.find();
      res.status(200).json(tables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTablesWithSessions(req, res) {
    try {
      const tables = await Table.find({});
      const tableSessions = await TableSession.find({
        status: SessionStatus.ACTIVE,
      });
      let sessionsDict = {};

      tableSessions.forEach((data) => {
        sessionsDict[data.table] = data;
      });

      const tablesWithSessions = tables.map((table) => {
        const session = sessionsDict[table._id];
        return {
          ...table.toObject(),
          session: session ? session.toObject() : null,
        };
      });

      res.status(200).json(tablesWithSessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTable(req, res) {
    try {
      const tables = await Table.create(req.body);
      res.status(201).json(tables);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateTable(req, res) {
    try {
      const tables = await Table.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(tables);
    } catch (error) {
      res.status(404).json({ error: "Table not found" });
    }
  }

  async deleteTable(req, res) {
    try {
      await Table.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Table not found" });
    }
  }
  async createReservation(req, res) {
    try {
      const tables = await Table.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(tables);
    } catch (error) {
      res.status(404).json({ error: "Table not found" });
    }
  }
  async updateStatus(req, res) {
    try {
      const tables = await Table.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(tables);
    } catch (error) {
      res.status(404).json({ error: "Table not found" });
    }
  }
}

module.exports = new TableController();
