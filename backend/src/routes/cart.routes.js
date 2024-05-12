// cartRoutes.js
const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");

router.post("/", CartController.createCartItem);
router.get("/:tableSessionId", CartController.getCartDetailsByTableSessions);
router.put("/:id", CartController.updateCartItem);
router.delete("/:id", CartController.deleteCartItem);

module.exports = router;
