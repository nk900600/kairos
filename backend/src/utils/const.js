const mobileNumberRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,100}$/;

const CategoryType = Object.freeze({
  APPETIZER: "Appetizer",
  SOUP: "Soup",
  DRINK: "Drink",
});
const SpiceLevel = Object.freeze({
  MILD: "Mild",
  MEDIUM: "Medium",
  SPICY: "Spicy",
  VERYSPICY: "Very Spicy",
});

const DietType = Object.freeze({
  VEGETARIAN: "Vegetarian",
  NON_VEGETARIAN: "Non-Vegetarian",
  VEGAN: "Vegan",
});

module.exports = {
  mobileNumberRegex,
  emailRegex,
  CategoryType,
  SpiceLevel,
  DietType,
};
