const { Designation } = require("../models/employee.model");
const { FirmType } = require("../models/firm.model");

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
    ],
  },
];

async function initializeFirmTypes() {
  try {
    for (const firmName of basicFirms) {
      const roleExists = await FirmType.findOne({
        where: { name: firmName.name },
      });

      if (!roleExists) {
        let firmType = await FirmType.create({
          name: firmName.name,
          description: firmName.description,
        });
        await Designation.bulkCreate(
          firmName.generalDesginations.map((data) => ({
            ...data,
            firmTypeId: firmType.id,
            firmId: null,
          })),
          {}
        );
      }
    }
    console.log("Basic firm types initialized successfully");
  } catch (error) {
    console.error("Error initializing basic roles:", error);
  }
}

module.exports = initializeFirmTypes;
