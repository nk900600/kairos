const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");

router.post("/", OrderController.create);
router.post("/:id/order-items", OrderController.createOrderItem);
router.get("/", OrderController.findAll);
router.get("/order-items/:id", OrderController.findOneOrderItem);
router.get("/:id", OrderController.findOne);
router.put("/order-items/:orderItemId", OrderController.updateOrderItem);
router.put(
  "/order-items/:orderItemId/customizations",
  OrderController.updateCustomization
);
router.delete("/:id", OrderController.delete);

module.exports = router;
