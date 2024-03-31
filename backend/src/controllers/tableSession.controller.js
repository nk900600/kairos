const {
  TableSession,
  SessionStatus,
} = require("../models/tableSession.model.js");
const { mobileNumberRegex } = require("../utils/const.js");

class TableSessionController {
  async createSession(req, res) {
    try {
      if (!req.body?.tableId || !req.body?.startTime) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Validate the mobile number
      if (
        req.body?.customerMobile &&
        !mobileNumberRegex.test(req.body?.customerMobile)
      ) {
        return res
          .status(400)
          .json({ message: "Invalid mobile number format" });
      }

      const newSession = await TableSession.create(
        {
          status: SessionStatus.ACTIVE,
          firmId: 1, // From Token
          ...req.body,
        },
        { user: 1 } // for Tokern
      );
      return res.status(201).json(newSession);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateSession(req, res) {
    try {
      const { id } = req.params;
      const session = await TableSession.findByPk(id);
      if (!session) {
        return res.status(404).json({ message: "Table session not found" });
      }
      await TableSession.update(
        {
          ...req.body,
        },
        { where: { id: session.id } }
      );
      return res.status(200).json(session);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateSessionOrderCount(req, res) {
    try {
      const { id } = req.params;
      const session = await TableSession.findByPk(id);
      if (!session) {
        return res.status(404).json({ message: "Table session not found" });
      }
      await TableSession.update(
        {
          orderCount: session.orderCount + 1,
        },
        { where: { id: session.id } }
      );
      return res.status(200).json(session);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteSession(req, res) {
    try {
      const { id } = req.params;
      const session = await TableSession.findByPk(id);
      if (!session) {
        return res.status(404).json({ message: "Table session not found" });
      }
      await session.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getSessionById(req, res) {
    try {
      const { id } = req.params;
      const session = await TableSession.findByPk(id);
      if (!session) {
        return res.status(404).json({ message: "Table session not found" });
      }
      return res.status(200).json(session);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getallSession(req, res) {
    try {
      const sessions = await TableSession.findAll();
      return res.status(200).json(sessions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TableSessionController();
