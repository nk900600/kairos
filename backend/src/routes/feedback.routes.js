const express = require("express");
const router = express.Router();
const FeedbackController = require("../controllers/feedback.controller");

router.get("/nps", FeedbackController.getNps);
router.get("/count-by-rating", FeedbackController.getCountByRating);
router.get("/average-ratings", FeedbackController.getAverageRating);
router.get("/", FeedbackController.get);
router.post("/", FeedbackController.create);

module.exports = router;
