const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const { Firm } = require("./firm.model");
const { TableSession } = require("./tableSession.model");

const Feedback = sequelize.define(
  "Feedback",
  {
    RatingFood: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RatingService: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RatingAmbience: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RatingOverall: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FeedbackDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    CustomerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomerEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CustomerPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // TableSessionId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   references: {
    //     model: "TableSessions", // Name of the Employee model
    //     key: "id",
    //   },
    // },
  },
  {
    timestamps: false,
  }
);

Feedback.belongsTo(Firm);
// Feedback.sync({ alter: true });
module.exports = Feedback;
