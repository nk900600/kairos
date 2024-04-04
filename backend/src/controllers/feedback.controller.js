const sequelize = require("../db/db");
const Feedback = require("../models/feedback.model");
const { Op } = require("sequelize");
class FeedbackController {
  async getAverageRating(req, res) {
    const { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      // Query the database for average ratings
      const averageRatings = await Feedback.findAll({
        attributes: [
          [sequelize.fn("AVG", sequelize.col("RatingFood")), "food"],
          [sequelize.fn("AVG", sequelize.col("RatingService")), "service"],
          [sequelize.fn("AVG", sequelize.col("RatingAmbience")), "ambience"],
          [sequelize.fn("AVG", sequelize.col("RatingOverall")), "overall"],
        ],
        where: {
          FeedbackDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
      });

      // Format the response
      const formattedResponse = averageRatings.reduce((acc, rating) => {
        acc.food = parseFloat(rating.dataValues?.food).toFixed(2);
        acc.service = parseFloat(rating.dataValues?.service).toFixed(2);
        acc.ambience = parseFloat(rating.dataValues?.ambience).toFixed(2);
        acc.overall = parseFloat(rating.dataValues?.overall).toFixed(2);
        return acc;
      }, {});

      return res.status(200).json(formattedResponse);
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getCountByRating(req, res) {
    const { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      // Query the database for average ratings
      const countByRating = await Feedback.findAll({
        attributes: [
          "RatingOverall",
          [sequelize.fn("COUNT", sequelize.col("RatingOverall")), "count"],
        ],
        where: {
          FeedbackDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        group: ["RatingOverall"],
      });

      // Format the response
      const formattedResult = {};
      countByRating.forEach((rating) => {
        formattedResult[rating.RatingOverall] = rating.dataValues.count;
      });

      return res.status(200).json(formattedResult);
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  async getNps(req, res) {
    const { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      const promoters = await Feedback.count({
        where: {
          RatingOverall: {
            [Op.gte]: 4,
          },
          FeedbackDate: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      const detractors = await Feedback.count({
        where: {
          RatingOverall: {
            [Op.lte]: 2,
          },
          FeedbackDate: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
      const totalResponses = promoters + detractors;
      const nps =
        totalResponses > 0
          ? ((promoters - detractors) / totalResponses) * 100
          : 0;

      return res.status(200).json({ nps });
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      if (
        !req.body?.RatingFood ||
        !req.body?.RatingOverall ||
        !req.body?.RatingService ||
        !req.body?.RatingAmbience
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const feedback = await Feedback.create({
        ...req.body,
        FirmId: req.user.firmId,
      });
      return res.status(201).json(feedback);
    } catch (error) {
      return res.status(400).json({ error: error + "Error creating feedback" });
    }
  }

  // Read Feedback (Get all feedback entries)
  async get(req, res) {
    try {
      const feedbackList = await Feedback.findAll();
      return res.json(feedbackList);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching feedback" });
    }
  }
}

module.exports = new FeedbackController();
