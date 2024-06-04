const express = require("express");
const router = express.Router();
const FirmSubscriptionController = require("../controllers/firmSubscription.controller");

// Create a new FirmSubscription
router.post("/", FirmSubscriptionController.createFirmSubscription);

// Get a FirmSubscription by ID
router.get("/:id", FirmSubscriptionController.getFirmSubscriptionById);

// start Trial a FirmSubscription
router.post("/trail", FirmSubscriptionController.startTrialFirmSubscription);

router.post(
  "/:id/create-sub",
  FirmSubscriptionController.createSubscriptionPaymentGateway
);
router.post(
  "/:id/pause/:subReferenceId",
  FirmSubscriptionController.pauseSubscriptionPaymentGateway
);
router.post(
  "/:id/activate/:subReferenceId",
  FirmSubscriptionController.activateSubscriptionPaymentGateway
);
router.post(
  "/:id/cancel/:subReferenceId",
  FirmSubscriptionController.cancelSubscriptionPaymentGateway
);

module.exports = router;
