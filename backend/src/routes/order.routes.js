const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.post("/", OrderController.create);
router.get("/", OrderController.findAll);
router.get("/:id", OrderController.findOne);
router.put("/:id", OrderController.update);
router.delete("/:id", OrderController.delete);

module.exports = router;
