const express = require("express");
const router = express.Router();
const menuItemsController = require("./../controllers/menuItem.controller");

router.get("/", menuItemsController.getAllMenuItems);
router.get("/:id", menuItemsController.getMenuItem);
router.post("/", menuItemsController.createMenuItem);
router.patch("/:id", menuItemsController.updateMenuItem);
router.delete("/:id", menuItemsController.deleteMenuItem);

module.exports = router;
