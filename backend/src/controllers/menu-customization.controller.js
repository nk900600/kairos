const {
  Customization,
  CustomizationChoice,
} = require("./../models/menuItem.model"); // Update the path as necessary

class MenuCustomizationController {
  async createCustomization(req, res) {
    try {
      const { name, isRequired, isMultiselect, menuItemId, choices } = req.body;

      const customization = await Customization.create({
        name,
        isRequired,
        isMultiselect,
        MenuItemId: menuItemId, // Associate the customization with a menu item
      });

      if (choices && choices.length > 0) {
        for (const choiceData of choices) {
          await CustomizationChoice.create({
            option: choiceData.option,
            additionalPrice: choiceData.additionalPrice,
            CustomizationId: customization.id,
          });
        }
      }

      res.status(201).json(customization);
    } catch (error) {
      console.error("Error creating customization:", error);
      res.status(500).send("Error creating customization");
    }
  }

  async getMenuCustomizationItem(req, res) {
    try {
      const menuCustomizationIItem = await Customization.findByPk(
        req.params.id,
        {
          include: [CustomizationChoice],
        }
      );

      if (!menuCustomizationIItem) {
        return res
          .status(404)
          .json({ message: "MenuCustomizationIItem not found" });
      }
      res.json(menuCustomizationIItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateCustomization(req, res) {
    try {
      const customizationId = req.params.id;
      const { name, isRequired, isMultiselect, menuItemId } = req.body;

      const customization = await Customization.findByPk(customizationId);
      if (!customization) {
        return res.status(404).send("Customization not found");
      }

      await customization.update({
        name,
        isRequired,
        isMultiselect,
        MenuItemId: menuItemId, // Update the associated menu item if needed
      });

      res.json(customization);
    } catch (error) {
      console.error("Error updating customization:", error);
      res.status(500).send("Error updating customization");
    }
  }

  // Delete a menu item
  async deleteMenuItem(req, res) {
    try {
      const customizationId = req.params.id;

      const customization = await Customization.findByPk(customizationId);
      if (!customization) {
        return res.status(404).send("Customization not found");
      }

      await customization.destroy();
      res.send("Customization deleted successfully");
    } catch (error) {
      console.error("Error deleting customization:", error);
      res.status(500).send("Error deleting customization");
    }
  }
}

module.exports = new MenuCustomizationController();
