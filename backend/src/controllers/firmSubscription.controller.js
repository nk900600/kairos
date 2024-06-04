const { where } = require("sequelize");
const { Firm } = require("../models/firm.model");
const {
  FirmSubscription,
  Subscription,
  SubscriptionStateType,
} = require("../models/subscription.model");
const {
  createSub,
  pauseSub,
  cancelSub,
  getSubDetails,
  activateSub,
} = require("../utils/cash-free-payments");
const { calculateNextBillingDate } = require("../utils/util");
const { format, add } = require("date-fns");

class FirmSubscriptionController {
  // Create a new FirmSubscription
  static async createFirmSubscription(req, res) {
    try {
      if (!req.body?.billingCycle || !req.body?.SubscriptionId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { SubscriptionId } = req.body;

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

      let nextBillingDate = calculateNextBillingDate(req.body?.billingCycle);
      const firmSubscription = await FirmSubscription.create({
        ...req.body,
        nextBillingDate,
        lastBillingDate: new Date(),
        trialEndDate: null,
        trialStartDate: null,
        FirmId: req.user.firmId,
      });

      let subs = await FirmSubscription.findOne({
        where: { id: firmSubscription.id },
        include: [{ model: Subscription }],
      });
      return res.status(201).json(subs);
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
      let subs = await FirmSubscription.findOne({
        where: { id: firmSubscription.id },
        include: [{ model: Subscription }],
      });
      return res.status(201).json(subs);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async createSubscriptionPaymentGateway(req, res) {
    try {
      console.log("dcdc");
      createSub({
        subscriptionId: Math.floor(Math.random() * 10000000) + 1,
        planId: "1",
        customerName: req.user.firstName + " " + req.user.lastName,
        customerPhone: req.user.mobileNumber,
        customerEmail: req.user.email,
        returnUrl: `http://localhost:4200/api/payment-redirect/${req.user.firmId}`,
        authAmount: 1,
        expiresOn: "2030-12-02 00:00:00",
        linkExpiry: 5,
        notificationChannels: ["EMAIL", "SMS"],
      })
        .then(async function (response) {
          console.log(response.data);
          const { subReferenceId, authLink } = response.data.data;
          await FirmSubscription.update(
            {
              subReferenceId,
              authLink,
            },
            { where: { id: req.params.id } }
          );

          return res.status(201).json(response.data.data);
        })
        .catch((error) => {
          return res.status(500).json({ message: error.message });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async pauseSubscriptionPaymentGateway(req, res) {
    try {
      pauseSub(req.params.subReferenceId)
        .then(async function (response) {
          await FirmSubscription.update(
            {
              isActive: false,
              subscriptionState: SubscriptionStateType.PAUSED,
            },
            { where: { id: req.params.id } }
          );

          return res.status(201).json(response.data);
        })
        .catch(function (error) {
          return res.status(500).json({ message: error.message });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async activateSubscriptionPaymentGateway(req, res) {
    try {
      activateSub(
        req.params.subReferenceId,
        JSON.stringify({
          nextScheduledOn: format(add(new Date(), { days: 3 }), "yyyy-MM-dd"),
        })
      )
        .then(async function (response) {
          await FirmSubscription.update(
            {
              isActive: true,
              subscriptionState: SubscriptionStateType.ACTIVE,
            },
            { where: { id: req.params.id } }
          );

          return res.status(201).json("sucesss");
        })
        .catch(function (error) {
          console.log(error);
          return res.status(500).json({ message: error.message });
        });

      // return res.status(201).json("subs");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async cancelSubscriptionPaymentGateway(req, res) {
    try {
      cancelSub(req.params.subReferenceId)
        .then(async function (response) {
          await FirmSubscription.update(
            {
              isActive: false,
              subscriptionState: SubscriptionStateType.CUSTOMER_CANCELLED,
            },
            { where: { id: req.params.id } }
          );
          return res.status(201).json(response.data);
        })
        .catch(function (error) {
          return res.status(500).json({ message: error.message });
        });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getSubscriptionPaymentGateway(req, res) {
    try {
      getSubDetails(req.params.subReferenceId)
        .then(async function (response) {
          await FirmSubscription.update(
            {
              isActive: false,
            },
            { where: { id: req.params.id } }
          );

          return res.status(201).json(response.data);
        })
        .catch(function (error) {
          return res.status(500).json({ message: error.message });
        });
      return res.status(201).json("subs");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = FirmSubscriptionController;
