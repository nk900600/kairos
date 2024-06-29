function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return duration == 0 ? 1 : duration + 1;
}

function calculateNextBillingDate(billingCycle) {
  const currentDate = new Date();
  if (billingCycle === "monthly") {
    return new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  } else if (billingCycle === "annually") {
    return new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
  }
}

module.exports = { calculateDuration, calculateNextBillingDate };
