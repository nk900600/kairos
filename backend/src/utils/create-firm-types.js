const { FirmType } = require("../models/firm.model");

const basicFirms = [
  {
    name: "Restaurant",
    description:
      "Establishments that prepare and serve food and beverages to customers",
  },
];

async function initializeFirmTypes() {
  try {
    for (const firmName of basicFirms) {
      const roleExists = await FirmType.findOne({
        where: { name: firmName.name },
      });

      if (!roleExists) {
        await FirmType.create({
          name: firmName.name,
          description: firmName.description,
        });
      }
    }
    console.log("Basic firm types initialized successfully");
  } catch (error) {
    console.error("Error initializing basic roles:", error);
  }
}

module.exports = initializeFirmTypes;
