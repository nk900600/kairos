// CartController.js
const sequelize = require("../db/db");

const { MenuItem, CustomizationChoice } = require("./../models/menuItem.model"); // Update the path as necessary
const { CartItemCustomization, CartItem } = require("./../models/cart.model"); // Update the path as necessary

class CartController {
  async createCartItem(req, res) {
    const transaction = await sequelize.transaction();

    try {
      if (
        !req.body?.menuItemId ||
        !req.body?.quantity ||
        !req.body?.tableSessionId
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const { menuItemId, quantity, tableSessionId } = req.body;
      const cartItem = await CartItem.create(
        {
          menuItemId,
          quantity,
          tableSessionId,
        },
        { transaction }
      );

      if (req.body?.customizations)
        for (let customizationId of req.body.customizations) {
          await CartItemCustomization.create(
            {
              cartItemId: cartItem.id,
              customizationChoiceId: customizationId,
            },
            { transaction }
          );
        }

      await transaction.commit();
      res.status(201).json(cartItem);
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: error.message });
    }
  }

  async getCartDetails(req, res) {
    try {
      if (!req.body?.tableSessionId) {
        return res
          .status(400)
          .json({ message: "Missing tableSessionId field" });
      }
      const cartItems = await CartItem.findAll({
        include: [
          {
            model: MenuItem,
            attributes: ["id", "name", "price", "description"],
          },
          {
            model: CartItemCustomization,
            include: [
              {
                model: CustomizationChoice,
                attributes: ["id", "name", "description"],
              },
            ],
          },
        ],
        attributes: ["id", "quantity", "menuItemId", "tableSessionId"],
      });
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCartItem(req, res) {
    try {
      const { id } = req.params;
      if (!req.body?.quantity) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const { quantity } = req.body;
      if (quantity == 0) {
        res.status(400).json({ message: "Cart quantity cannot be zero" });
      }
      const cartItem = await CartItem.findByPk(id);
      if (cartItem) {
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem);
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCartItem(req, res) {
    const { id } = req.params;
    try {
      const result = await CartItem.destroy({
        where: { id },
      });
      if (result === 0) {
        res
          .status(404)
          .json({ message: "Cart item not found or already deleted" });
      } else {
        res.status(200).json({ message: "Cart item deleted successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CartController();
