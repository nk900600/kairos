const { Subscription } = require("../models/subscription.model");

const subscriptionPlans = [
  {
    name: "Starter",
    monthlyPrice: 299,
    yearlyPrice: 2999,
    yearlyDiscountPercentage: 10,
    features: "Access to basic features, Standard support",
    isActive: true,
    discountPercentage: 0,
    orderLimit: 100,
    cancellationPolicy: "Cancel anytime with a 30-day notice.",
    additionalNotes: "Great for small teams and startups.",
    trialPeriod: 30,
  },
  {
    name: "Premium",
    monthlyPrice: 599,
    yearlyPrice: 5999,
    yearlyDiscountPercentage: 10,
    features: "Unlimited access, Priority support, Advanced analytics",
    isActive: true,
    discountPercentage: 10,
    orderLimit: 500,
    cancellationPolicy: "Cancel anytime with a 30-day notice.",
    additionalNotes: "Best value for large teams.",
    trialPeriod: 30,
  },
  {
    name: "Premium Plus",
    monthlyPrice: 999,
    yearlyPrice: 9999,
    yearlyDiscountPercentage: 10,
    features: "Unlimited access, Priority support, Advanced analytics",
    isActive: true,
    discountPercentage: 10,
    currency: "USD",
    orderLimit: 10000,
    cancellationPolicy: "Cancel anytime with a 30-day notice.",
    additionalNotes: "Best value for large teams.",
    trialPeriod: 30,
  },
];

async function initializeSubsription() {
  try {
    await Subscription.bulkCreate(subscriptionPlans, {
      ignoreDuplicates: true,
    });
    console.log("Subscription initialized successfully");
  } catch (error) {
    console.error("Error initializing Subscription:", error);
  }
}

module.exports = initializeSubsription;
