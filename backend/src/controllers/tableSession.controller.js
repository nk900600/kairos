const { Op } = require("sequelize");
const { TableStatus } = require("../enums/tables.enum.js");
const { Table } = require("../models/table.model.js");
const {
  TableSession,
  SessionStatus,
} = require("../models/tableSession.model.js");
const { mobileNumberRegex } = require("../utils/const.js");
const { eachDayOfInterval, format, addDays } = require("date-fns");

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
          firmId: req.user.firmId, // From Token
          ...req.body,
        },
        { userId: req.user.id } // for Tokern
      );
      await Table.update(
        {
          status: TableStatus.OCCUPIED,
        },
        { where: { id: req.body?.tableId } }
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
        { where: { id: session.id } },
        { userId: req.user.id } // for Tokern
      );
      const updatedSession = await TableSession.findByPk(session.id);
      return res.status(200).json(updatedSession);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async incerementSessionOrderCount(req, res) {
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
      const sessions = await TableSession.findAll({
        where: { firmId: req.user.firmId },
      });
      return res.status(200).json(sessions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getAverageDataPerTableSessions(req, res) {
    try {
      let { startDate, endDate } = req.query;
      startDate = new Date(startDate);
      startDate.setHours(0, 0, 0, 0); // Set the time to 12:00 AM

      endDate = new Date(endDate);
      endDate.setHours(23, 59, 59, 999); // Include the entire end day

      const days = eachDayOfInterval({ start: startDate, end: endDate });
      const dailyWaitTimeMetrics = [];
      let cumulativeWaitTime = 0;
      let cumulativeSessions = 0;

      console.log(days, "days");

      for (const day of days) {
        const dayStart = new Date(day);
        const dayEnd = addDays(day, 1);

        const sessions = await TableSession.findAll({
          where: {
            firmId: req.user.firmId,
            endTime: {
              [Op.ne]: null,
            },
            startTime: {
              [Op.gte]: dayStart,
              [Op.lt]: dayEnd,
            },
          },
        });

        const totalWaitTime = sessions.reduce((acc, session) => {
          const startTime = new Date(session.startTime);
          const endTime = new Date(session.endTime);
          const waitTime = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes
          return acc + waitTime;
        }, 0);
        const currentDaySessions = sessions.length;

        if (currentDaySessions > 0) {
          cumulativeWaitTime += totalWaitTime;
          cumulativeSessions += currentDaySessions;
        }
        const averageWaitTime =
          cumulativeSessions > 0 ? cumulativeWaitTime / cumulativeSessions : 0;

        dailyWaitTimeMetrics.push({
          date: format(dayStart, "yyyy-MM-dd"),
          averageWaitTime,
          waitTimePerDay: totalWaitTime,
        });
      }

      const tables = await Table.findAll({
        where: {
          firmId: req.user.firmId,
        },
      });

      // Average Tine per table is calculated
      const averageWaitTime =
        cumulativeSessions > 0 ? cumulativeWaitTime / cumulativeSessions : 0;
      const numberOfDays = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24)
      );
      // const tableTurnoverRate = sessions.length / tables.length;

      const tableTurnoverRate =
        tables.length > 0 && numberOfDays > 0
          ? cumulativeSessions / (tables.length * numberOfDays)
          : 0;

      return res
        .status(200)
        .json({ tableTurnoverRate, averageWaitTime, dailyWaitTimeMetrics });
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new TableSessionController();
