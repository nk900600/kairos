const { Op } = require("sequelize");
const sequelize = require("../db/db");
const { CartItem, CartItemCustomization } = require("../models/cart.model");
const { OrderItem, Order } = require("../models/order.model");
const {
  MenuItem,
  Customization,
  CustomizationChoice,
  Category,
} = require("./../models/menuItem.model"); // Update the path as necessary

class MenuItemsController {
  // Get all menu items
  async getAllMenuItems(req, res) {
    try {
      const menuItems = await MenuItem.findAll({
        where: { firmId: req.user.firmId },
        include: [
          {
            model: Customization,
            include: [
              {
                model: CustomizationChoice,
              },
            ],
          },
        ],
      });

      return res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return res.status(500).send("Error fetching menu items");
    }
  }
  async getAllCategories(req, res) {
    try {
      const menuItems = await Category.findAll({
        where: {
          [Op.or]: [{ firmId: null }, { firmId: req.user.firmId }],
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
      return res.json(menuItem);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async getMenuCustomization(req, res) {
    try {
      const menuItem = await Customization.findByPk(req.params.customid, {
        include: [CustomizationChoice],
      });

      if (!menuItem) {
        return res.status(404).json({ message: "Customization not found" });
      }
      return res.json(menuItem);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateMenuCustomization(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const menuItem = await Customization.findByPk(req.params.customid);
      if (!menuItem) {
        return res.status(404).send("Customization item not found");
      }

      const customization = await Customization.update(
        {
          ...req.body,
        },
        { transaction, userId: req.user.id, where: { id: req.params.customid } }
      );

      if (req.body?.choices && req.body?.choices.length > 0) {
        const choicePromises = req.body?.choices.map((choiceData) => {
          return CustomizationChoice.update(
            {
              ...choiceData,
            },
            {
              transaction,
              userId: req.user.id,
              where: { CustomizationId: req.params.customid },
            }
          );
        });

        await Promise.all(choicePromises);
      }

      transaction.commit();
      return res.status(201).json(customization);
    } catch (err) {
      transaction.rollback();
      return res.status(500).json({ message: err.message });
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
        !req.body?.dietType
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { name, description, price, categoryId, spiceLevel, dietType } =
        req.body;

      // Create the menu item
      const menuItem = await MenuItem.create(
        {
          name,
          description,
          price,
          categoryId,
          available: true,
          spiceLevel,
          dietType,
          firmId: req.user.firmId,
        },
        { transaction, userId: req.user.id }
      );
      let data = [];
      if (req.body?.customizations && req.body?.customizations.length > 0) {
        const customizations = req.body?.customizations;
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
              { transaction, userId: req.user.id }
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
                    { transaction, userId: req.user.id }
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
  // Create a new menu item
  async createCustomizationItem(req, res) {
    const transaction = await sequelize.transaction();

    try {
      if (!req.body?.customizations) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // const customizations = req.body?.customizations;
      // let data = await processCustomizations(customizations, req, transaction);
      // data = logCustomizations(data);
      const customizations = req.body?.customizations;
      const customizationPromises = customizations.map(
        async (customizationData) => {
          if (!customizationData.name) {
            throw new Error("Missing required fields - customization - Name ");
          }

          let customization = await Customization.create(
            {
              ...customizationData,
              menuItemId: req.params.id,
            },
            { transaction, userId: req.user.id }
          );

          if (
            customizationData.choices &&
            customizationData.choices.length > 0
          ) {
            customization["choices"] = [];

            const choicePromises = customizationData.choices.map(
              async (choiceData) => {
                if (!choiceData.name) {
                  throw new Error(
                    "Missing required fields - choiceData - Name "
                  );
                }
                let data = await CustomizationChoice.create(
                  {
                    ...choiceData,
                    CustomizationId: customization.id,
                  },
                  { transaction, userId: req.user.id }
                );
                return data; // Return data to be included in the Promise.all
              }
            );

            // Wait for all choices to be created and added to customization["choices"]
            customization["choices"] = await Promise.all(choicePromises);
          }

          return customization;
        }
      );

      await Promise.all(customizationPromises);

      transaction.commit();

      const menuItems = await Customization.findAll({
        where: {
          menuItemId: req.params.id, // Ensure that the 'menuId' is the correct field name in your 'Customization' model
        },
        include: [
          {
            model: CustomizationChoice,
          },
        ],
      });
      return res.status(201).json({ menuItems });
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

      await menuItem.update(req.body, { userId: req.user.id });
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
      const customizations = await Customization.findAll({
        where: { MenuItemId: menuItemId },
      });

      await Promise.all(
        customizations.map((customization) =>
          CustomizationChoice.destroy({
            where: { CustomizationId: customization.id },
          })
        )
      );

      await Promise.all(
        customizations.map((customization) =>
          CartItemCustomization.destroy({
            where: { customizationChoiceId: customization.id },
          })
        )
      );

      await Customization.destroy({
        where: { menuItemId: menuItemId },
      });

      const allOrderItemData = await OrderItem.findAll({
        where: { MenuItemId: menuItemId },
      });

      await Promise.all(
        allOrderItemData.map((orderItem) =>
          Order.destroy({
            where: { id: orderItem.OrderId },
          })
        )
      );

      await OrderItem.destroy({
        where: { MenuItemId: menuItemId },
      });
      await CartItem.destroy({
        where: { menuItemId: menuItemId },
      });

      await menuItem.destroy();

      res.status(204).send("Menu item deleted successfully");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      res.status(500).send("Error deleting menu item");
    }
  }
  async deleteMenuCustomization(req, res) {
    try {
      const customization = await Customization.findByPk(req.params.customid);
      if (!customization) {
        return res.status(404).send("Customization item not found");
      }

      await CustomizationChoice.destroy({
        where: { CustomizationId: customization.id },
      });

      await customization.destroy();

      res.send("Customization item deleted successfully");
    } catch (error) {
      console.error("Error deleting Customization item:", error);
      res.status(500).send("Error deleting Customization item");
    }
  }
  async createCategory(req, res) {
    try {
      if (!req.body?.title) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const category = await Category.create({
        ...req.body,
        firmTypeId: 1,
        firmId: req.user.firmId,
      });

      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).send("Error creating category");
    }
  }
  async createBulkMenuItems(req, res) {
    const transaction = await sequelize.transaction();
    try {
      if (!req.body?.length) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const menuItems = req.body;

      const allCategory = menuItems.map((item) => ({
        title: item.categoryName,
        firmTypeId: 1,
        firmId: req.user.firmId,
      }));

      await Category.bulkCreate(allCategory, { ignoreDuplicates: true });
      const allCategories = await Category.findAll({
        where: {
          [Op.or]: [{ firmId: null }, { firmId: req.user.firmId }],
        },
      });
      const categoriesMap = {};
      allCategories.forEach((val) => {
        categoriesMap[val.title] = val.id;
      });

      for (const item of menuItems) {
        const {
          name,
          description,
          price,
          categoryName,
          spiceLevel,
          dietType,
          customizations,
        } = item;

        // Create the menu item
        const menuItem = await MenuItem.create(
          {
            name,
            description,
            price,
            categoryId: categoriesMap[categoryName],
            available: true,
            spiceLevel,
            dietType,
            firmId: req.user.firmId,
          },
          { transaction, userId: req.user.id, ignoreDuplicates: true }
        );

        if (customizations && customizations.length > 0) {
          for (const customizationData of customizations) {
            if (!customizationData.name) {
              throw new Error("Missing required fields - customization - Name");
            }

            const customization = await Customization.create(
              {
                ...customizationData,
                menuItemId: menuItem.id,
              },
              { transaction, userId: req.user.id }
            );

            if (
              customizationData.choices &&
              customizationData.choices.length > 0
            ) {
              for (const choiceData of customizationData.choices) {
                if (!choiceData.name) {
                  throw new Error(
                    "Missing required fields - choiceData - Name"
                  );
                }
                await CustomizationChoice.create(
                  {
                    ...choiceData,
                    CustomizationId: customization.id,
                  },
                  { transaction, userId: req.user.id }
                );
              }
            }
          }
        }
      }

      await transaction.commit();
      const items = await MenuItem.findAll({
        where: { firmId: req.user.firmId },
        include: [
          {
            model: Customization,
            include: [
              {
                model: CustomizationChoice,
              },
            ],
          },
        ],
      });

      res.status(201).json({ items });
    } catch (error) {
      transaction.rollback();
      console.error("Error creating bulk menu items:", error);
      res.status(500).send("Error creating bulk menu items");
    }
  }
}

module.exports = new MenuItemsController();
