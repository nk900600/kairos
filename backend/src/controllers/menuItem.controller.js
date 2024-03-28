const {
  MenuItem,
  Customization,
  CustomizationChoice,
} = require("./../models/menuItem.model"); // Update the path as necessary

class MenuItemsController {
  // Get all menu items
  async getAllMenuItems(req, res) {
    try {
      const menuItems = await MenuItem.findAll({
        include: {
          model: Customization,
          include: [CustomizationChoice],
        },
      });
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).send("Error fetching menu items");
    }
  }

  // Get a single menu item by ID
  async getMenuItem(req, res) {
    try {
      const menuItem = await MenuItem.findByPk(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ message: "MenuItem not found" });
      }
      res.json(menuItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Create a new menu item
  async createMenuItem(req, res) {
    try {
      const {
        name,
        description,
        price,
        category,
        available,
        spiceLevel,
        isVegetarian,
        isNonVegetarian,
        isVegan,
        imageUrl,
        customizations,
      } = req.body;

      // Create the menu item
      const menuItem = await MenuItem.create({
        name,
        description,
        price,
        category,
        available,
        spiceLevel,
        isVegetarian,
        isNonVegetarian,
        isVegan,
        imageUrl,
      });

      // Create customizations and customization choices
      if (customizations && customizations.length > 0) {
        for (const customizationData of customizations) {
          const customization = await Customization.create({
            name: customizationData.name,
            isRequired: customizationData.isRequired,
            isMultiselect: customizationData.isMultiselect,
            MenuItemId: menuItem.id,
          });

          await menuItem.addCustomization(customization);

          if (
            customizationData.choices &&
            customizationData.choices.length > 0
          ) {
            for (const choiceData of customizationData.choices) {
              await CustomizationChoice.create({
                option: choiceData.option,
                additionalPrice: choiceData.additionalPrice,
                CustomizationId: customization.id,
              });
            }
          }
        }
      }

      res.status(201).json(menuItem);
    } catch (error) {
      console.error("Error creating menu item:", error);
      res.status(500).send("Error creating menu item");
    }
  }

  // Update a menu item
  async updateMenuItem(req, res) {
    try {
      const menuItemId = req.params.id;
      const {
        name,
        description,
        price,
        category,
        available,
        spiceLevel,
        isVegetarian,
        isNonVegetarian,
        isVegan,
        imageUrl,
      } = req.body;

      // Find the menu item
      const menuItem = await MenuItem.findByPk(menuItemId);
      if (!menuItem) {
        return res.status(404).send("Menu item not found");
      }

      // Update only the provided fields
      if (name !== undefined) menuItem.name = name;
      if (description !== undefined) menuItem.description = description;
      if (price !== undefined) menuItem.price = price;
      if (category !== undefined) menuItem.category = category;
      if (available !== undefined) menuItem.available = available;
      if (spiceLevel !== undefined) menuItem.spiceLevel = spiceLevel;
      if (isVegetarian !== undefined) menuItem.isVegetarian = isVegetarian;
      if (isNonVegetarian !== undefined)
        menuItem.isNonVegetarian = isNonVegetarian;
      if (isVegan !== undefined) menuItem.isVegan = isVegan;
      if (imageUrl !== undefined) menuItem.imageUrl = imageUrl;

      await menuItem.save();

      res.json(menuItem);
    } catch (error) {
      console.error("Error updating menu item:", error);
      res.status(500).send("Error updating menu item");
    }
  }

  // Delete a menu item
  async deleteMenuItem(req, res) {
    try {
      const menuItemId = req.params.id;

      // Find and delete the menu item
      const menuItem = await MenuItem.findByPk(menuItemId);
      if (!menuItem) {
        return res.status(404).send("Menu item not found");
      }

      await menuItem.destroy();

      res.send("Menu item deleted successfully");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).send("Error deleting menu item");
    }
  }
}

module.exports = new MenuItemsController();
