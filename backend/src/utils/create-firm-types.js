const { Designation } = require("../models/employee.model");
const { FirmType } = require("../models/firm.model");
const { Category } = require("../models/menuItem.model");

const basicFirms = [
  {
    name: "Restaurant",
    description:
      "Establishments that prepare and serve food and beverages to customers",
    generalDesginations: [
      { title: "Chef" },
      { title: "Sous Chef" },
      { title: "Pastry Chef" },
      { title: "Line Cook" },
      { title: "Prep Cook" },
      { title: "Kitchen Assistant" },
      { title: "Dishwasher" },
      { title: "Restaurant Manager" },
      { title: "Assistant Manager" },
      { title: "Host/Hostess" },
      { title: "Waiter/Waitress" },
      { title: "Bartender" },
      { title: "Busser" },
      { title: "Sommelier" },
      { title: "Barista" },
      { title: "Owner" },
    ],
    categoriesType: [
      { title: "Rice and Biryanis" },
      { title: "Breads" },
      { title: "Appetizers and Starters" },
      { title: "Salads" },
      { title: "Soups" },
      { title: "Finger Foods" },
      { title: "Dips and Spreads" },
      { title: "Main Courses" },
      { title: "Meat Dishes" },
      { title: "Seafood" },
      { title: "Vegan Dishes" },
      { title: "Pasta" },
      { title: "Rice and Grains" },
      { title: "Side Dishes" },
      { title: "Vegetables" },
      { title: "Potatoes" },
      { title: "Bread" },
      { title: "Rice" },
      { title: "Beans and Lentils" },
      { title: "Desserts" },
      { title: "Beverages" },
      { title: "Specialties and Regional Dishes" },
      { title: "Kids Menu" },
      { title: "Combos and Thalis" },
    ],
  },
];

async function initializeFirmTypes() {
  try {
    for (const firmName of basicFirms) {
      let firmExist = await FirmType.findOne({
        where: { name: firmName.name },
      });
      if (!firmExist) {
        firmExist = await FirmType.create({
          name: firmName.name,
          description: firmName.description,
        });
      }
      await Designation.bulkCreate(
        firmName.generalDesginations.map((data) => ({
          ...data,
          firmTypeId: firmExist.id,
          firmId: null,
        })),
        { ignoreDuplicates: true }
      );
      await Category.bulkCreate(
        firmName.categoriesType.map((data) => ({
          ...data,
          firmTypeId: firmExist.id,
          firmId: null,
        })),
        { ignoreDuplicates: true }
      );
    }
    console.log("Basic firm types initialized successfully");
  } catch (error) {
    console.error("Error initializing basic roles:", error);
  }
}

module.exports = initializeFirmTypes;
