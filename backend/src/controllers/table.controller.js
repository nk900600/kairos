const sequelize = require("../db/db.js");
const { TableStatus } = require("../enums/tables.enum.js");
const { Table } = require("../models/table.model.js");
const {
  TableSession,
  SessionStatus,
  PaymentStatus,
} = require("../models/tableSession.model.js");
const { webPush, sendPushNotification } = require("../utils/web-notification.js");

class TableController {
  async getAllTables(req, res) {
    try {
      const tables = await Table.findAll({
        where: { firmId: req.user.firmId },
      });
      return res.status(200).json(tables);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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

      return res.status(200).json(tablesWithSessions);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async createTable(req, res) {
    try {
      if (!req.body?.tableName || !req.body?.capacity) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const tables = await Table.create(
        { ...req.body, firmId: req.user.firmId },
        { userId: req.user.id }
      );

      // sendPushNotification(
      //   { title: "Great!", body: "New Order placed" },
      //   req.user.firmId,
      //   8
      // );
      return res.status(201).json(tables);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateTable(req, res) {
    try {
      const { id } = req.params;
      const session = await Table.findByPk(id);
      if (!session) {
        return res.status(404).json({ message: "Table session not found" });
      }
      const updatedTable = await Table.update(
        {
          ...req.body,
        },
        { where: { id: session.id } }
      );
      return res.status(200).json(updatedTable);
    } catch (error) {
      return res.status(404).json({ error: "Table not found" });
    }
  }

  async deleteTable(req, res) {
    try {
      const table = await Table.findByPk(req.params.id, {});
      if (table) {
        // Optionally, you can perform additional actions before deleting, such as logging or unlinking associations
        await table.destroy({ userId: req.user.id });
        return res.status(204).send(); // No content to send back
      } else {
        return res.status(404).json({ error: "table not found" });
      }
    } catch (error) {
      return res.status(404).json({ error: "Table not found" });
    }
  }
  async createReservation(req, res) {
    try {
      if (!req.body?.reservationName || !req.body?.reservationTime) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const table = await Table.findByPk(req.params.id);
      if (!table) {
        return res.status(404).json({ message: "Table session not found" });
      }
      await Table.update(
        {
          ...req.body,
          status: TableStatus.RESERVED,
        },
        { where: { id: table.id } }
      );
      return res.status(200).json(table);
    } catch (error) {
      return res.status(404).json({ error: "Table not found" });
    }
  }
  async updateStatus(req, res) {
    const transaction = await sequelize.transaction();

    try {
      if (!req.body?.status) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const table = await Table.findByPk(req.params.id, { transaction });
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }

      await Table.update(
        {
          status: req.body?.status,
          reservationName: null,
          reservationTime: null,
          reservationPartySize: null,
        },
        { where: { id: table.id }, transaction }
      );

      if (req.body?.status == TableStatus.AVAILABLE) {
        await TableSession.update(
          { status: SessionStatus.CLOSE, paymentStatus: PaymentStatus.PAID },
          {
            where: { tableId: req.params.id, status: SessionStatus.ACTIVE },
            transaction,
          }
        );
      }
      await transaction.commit();
      return res.status(200).json(table);
    } catch (error) {
      await transaction.rollback();
      return res.status(404).json({ error: "Table not found" });
    }
  }
}

module.exports = new TableController();
