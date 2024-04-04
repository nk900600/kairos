const express = require("express");
const router = express.Router();
const FirmSubscriptionController = require("../controllers/firmSubscription.controller");

// Create a new FirmSubscription
router.post("/", FirmSubscriptionController.createFirmSubscription);

// Get all FirmSubscriptions
router.get("/", FirmSubscriptionController.getAllFirmSubscriptions);

// Get a FirmSubscription by ID
router.get("/:id", FirmSubscriptionController.getFirmSubscriptionById);

// Update a FirmSubscription
router.put("/:id", FirmSubscriptionController.updateFirmSubscription);

// Delete a FirmSubscription
router.delete("/:id", FirmSubscriptionController.deleteFirmSubscription);

// Renew a FirmSubscription
router.post("/:id/renew", FirmSubscriptionController.renewFirmSubscription);

// Cancel a FirmSubscription
router.post("/:id/cancel", FirmSubscriptionController.cancelFirmSubscription);
// start Trial a FirmSubscription
router.post("/trail", FirmSubscriptionController.startTrialFirmSubscription);

module.exports = router;
