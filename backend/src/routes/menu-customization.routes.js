const express = require("express");
const menuCustomizationController = require("./../controllers/menu-customization.controller"); // Adjust the path to your controller

const router = express.Router();

// Route for creating a new customization
router.post(
  "/menu-items/:id/customizations",
  menuCustomizationController.createCustomization
);

// Route for updating an existing customization
router.put(
  "/menu-items/:id/customizations/:id",
  menuCustomizationController.updateCustomization
);

// Route for deleting a customization
router.delete(
  "/customizations/:id",
  menuCustomizationController.deleteMenuItem
);

module.exports = router;
