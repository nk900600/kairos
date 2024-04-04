const { Firm } = require("../models/firm.model");
const {
  FirmSubscription,
  Subscription,
} = require("../models/subscription.model");
const { calculateNextBillingDate } = require("../utils/util");

class FirmSubscriptionController {
  // Create a new FirmSubscription
  static async createFirmSubscription(req, res) {
    try {
      if (!req.body?.billingCycle || !req.body?.SubscriptionId) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      let nextBillingDate = calculateNextBillingDate(req.body?.billingCycle);
      const firmSubscription = await FirmSubscription.create({
        ...req.body,
        nextBillingDate,
        lastBillingDate: new Date(),
        FirmId: req.user.firmId,
      });
      return res.status(201).json(firmSubscription);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get all FirmSubscriptions
  static async getAllFirmSubscriptions(req, res) {
    try {
      const firmSubscriptions = await FirmSubscription.findAll({
        include: [Subscription, Firm],
      });
      return res.status(200).json(firmSubscriptions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get a FirmSubscription by ID
  static async getFirmSubscriptionById(req, res) {
    try {
      const firmSubscription = await FirmSubscription.findByPk(req.params.id, {
        include: [Subscription, Firm],
      });
      if (!firmSubscription) {
        return res.status(404).json({ message: "FirmSubscription not found" });
      }
      return res.status(200).json(firmSubscription);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update a FirmSubscription
  static async updateFirmSubscription(req, res) {
    try {
      const firmSubscription = await FirmSubscription.findByPk(req.params.id);
      if (!firmSubscription) {
        return res.status(404).json({ message: "FirmSubscription not found" });
      }
      await firmSubscription.update(req.body);
      return res.status(200).json(firmSubscription);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete a FirmSubscription
  static async deleteFirmSubscription(req, res) {
    try {
      const firmSubscription = await FirmSubscription.findByPk(req.params.id);
      if (!firmSubscription) {
        return res.status(404).json({ message: "FirmSubscription not found" });
      }
      await firmSubscription.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Renew a FirmSubscription
  static async renewFirmSubscription(req, res) {
    try {
      const firmSubscriptions = await FirmSubscription.findOne({
        where: { id: req.params.id },
      });
      if (!firmSubscriptions) {
        return res.status(400).json({ message: "subscription not found" });
      }

      if (firmSubscriptions && firmSubscriptions.isActive) {
        return res.status(400).json({ message: "subscription already active" });
      }

      let nextBillingDate = calculateNextBillingDate(
        firmSubscriptions.billingCycle
      );

      firmSubscriptions.isActive = true;
      firmSubscriptions.nextBillingDate = nextBillingDate;
      firmSubscriptions.save();
      return res.status(200).json(firmSubscriptions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Cancel a FirmSubscription
  static async cancelFirmSubscription(req, res) {
    try {
      const firmSubscriptions = await FirmSubscription.findOne({
        where: { id: req.params.id },
      });
      if (!firmSubscriptions) {
        return res.status(400).json({ message: "subscription not found" });
      }

      firmSubscriptions.isActive = false;
      firmSubscriptions.save();
      return res.status(200).json(firmSubscriptions);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async startTrialFirmSubscription(req, res) {
    try {
      if (!req.body?.billingCycle || !req.body?.SubscriptionId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { billingCycle, SubscriptionId } = req.body;

      const subscription = await Subscription.findByPk(SubscriptionId, {});
      if (!subscription) {
        return res.status(400).json({ message: "subscription not found" });
      }

      const firmSubscriptions = await FirmSubscription.findOne({
        where: { firmId: req.user.firmId },
      });

      if (firmSubscriptions && firmSubscriptions.trialStartDate) {
        return res.status(400).json({ message: "Trail already availed" });
      }
      if (firmSubscriptions) {
        return res
          .status(400)
          .json({ message: "Already have a active subscription" });
      }

      const currentDate = new Date(); // Get the current date
      const futureDate = new Date(currentDate); // Create a new Date object based on the current date
      futureDate.setDate(futureDate.getDate() + subscription.trialPeriod);

      const firmSubscription = await FirmSubscription.create({
        billingCycle,
        SubscriptionId,
        trialStartDate: new Date(),
        trialEndDate: futureDate,
        nextBillingDate: futureDate,
        FirmId: req.user.firmId,
      });
      return res.status(201).json(firmSubscription);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = FirmSubscriptionController;
