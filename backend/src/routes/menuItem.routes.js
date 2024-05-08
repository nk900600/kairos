const express = require("express");
const router = express.Router();
const menuItemsController = require("./../controllers/menuItem.controller");

router.get("/", menuItemsController.getAllMenuItems);
router.get("/categories", menuItemsController.getAllCategories);
router.get("/:id", menuItemsController.getMenuItem);
router.get(
  "/:id/customization/:customid",
  menuItemsController.getMenuCustomization
);
router.post("/", menuItemsController.createMenuItem);
router.patch("/:id", menuItemsController.updateMenuItem);
router.patch(
  "/:id/customization/:customid",
  menuItemsController.updateMenuCustomization
);
router.post("/:id/customization/", menuItemsController.createCustomizationItem);
router.delete("/:id", menuItemsController.deleteMenuItem);
router.delete(
  "/:id/customization/:customid",
  menuItemsController.deleteMenuCustomization
);

module.exports = router;
