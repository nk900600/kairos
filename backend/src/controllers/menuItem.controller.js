const sequelize = require("../db/db");
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
          include: [
            {
              model: CustomizationChoice,
            },
          ],
        },
      });

      return res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return res.status(500).send("Error fetching menu items");
    }
  }

  // Get a single menu item by ID
  async getMenuItem(req, res) {
    try {
      const menuItem = await MenuItem.findByPk(req.params.id, {
        include: [
          {
            model: Customization,
            include: [CustomizationChoice],
          },
        ],
      });

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
    const transaction = await sequelize.transaction();

    try {
      if (
        !req.body?.name ||
        !req.body?.categoryId ||
        !req.body?.price ||
        !req.body?.spiceLevel ||
        !req.body?.dietType ||
        !req.body?.firmId
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const {
        name,
        description,
        price,
        categoryId,
        available,
        spiceLevel,
        dietType,
        imageUrl,
        customizations,
        firmId,
      } = req.body;

      // Create the menu item
      const menuItem = await MenuItem.create(
        {
          name,
          description,
          price,
          categoryId,
          available,
          spiceLevel,
          dietType,
          imageUrl,
          firmId,
        },
        { transaction, userId: 1 }
      );

      let data = [];
      if (customizations && customizations.length > 0) {
        const customizationPromises = customizations.map(
          async (customizationData) => {
            if (!customizationData.name) {
              throw new Error(
                "Missing required fields - customization - Name "
              );
            }

            const customization = await Customization.create(
              {
                ...customizationData,
                menuItemId: menuItem.id,
              },
              { transaction, userId: 1 }
            );

            if (
              customizationData.choices &&
              customizationData.choices.length > 0
            ) {
              const choicePromises = customizationData.choices.map(
                (choiceData) => {
                  if (!choiceData.name) {
                    throw new Error(
                      "Missing required fields - choiceData - Name "
                    );
                  }
                  return CustomizationChoice.create(
                    {
                      ...choiceData,
                      CustomizationId: customization.id,
                    },
                    { transaction, userId: 1 }
                  );
                }
              );

              await Promise.all(choicePromises);
            }

            return customization;
          }
        );

        data = await Promise.all(customizationPromises);
      }

      transaction.commit();

      return res.status(201).json({ menuItem, data });
    } catch (error) {
      console.log("Error creating menu item:", error);
      transaction.rollback();
      return res.status(500).send("Error creating menu item");
    }
  }

  // Update a menu item
  async updateMenuItem(req, res) {
    try {
      const menuItemId = req.params.id;
      // Find the menu item
      const menuItem = await MenuItem.findByPk(menuItemId);
      if (!menuItem) {
        return res.status(404).send("Menu item not found");
      }

      await menuItem.update(req.body, { userId: 1 });
      return res.status(201).json(menuItem);
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
