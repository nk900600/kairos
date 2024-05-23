const calculatePercentageChange = (current, previous) => {
  if (previous === 0) {
    return current > 0 ? 100 : 0; // If there were no employees last month but some this month, it's a 100% increase
  }
  return ((current - previous) / previous) * 100;
};

module.exports = { calculatePercentageChange };
