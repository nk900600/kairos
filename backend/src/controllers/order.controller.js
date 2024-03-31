const sequelize = require("../db/db");
const { CustomizationChoice } = require("../models/menuItem.model");
const {
  Order,
  OrderItem,
  OrderItemCustomizationsChoice,
} = require("../models/order.model");

const OrderController = {
  // Create a new order
  create: async (req, res) => {
    const { orderItems, ...orderDetails } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const order = await Order.create(orderDetails, {
        userId: 1,
      });

      // Inside the createOrder method

      const orderItemPromises = orderItems.map(async (item) => {
        const { customizations, ...itemDetails } = item;
        const orderItem = await OrderItem.create(
          {
            ...itemDetails,
            OrderId: order.id,
          },
          { transaction, userId: 1 }
        );

        if (customizations && customizations.length > 0) {
          const customizationPromises = customizations.map(
            (customizationChoiceId) =>
              OrderItemCustomizationsChoice.create(
                {
                  OrderItemId: orderItem.id,
                  CustomizationChoiceId: customizationChoiceId,
                },
                { transaction, userId: 1 }
              )
          );
          await Promise.all(customizationPromises);
        }

        return orderItem;
      });

      await Promise.all(orderItemPromises);

      await transaction.commit();

      const createdOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            as: "orderItems",
            include: [
              {
                model: CustomizationChoice,
              },
            ],
          },
        ],
      });

      return res.status(201).json(createdOrder);
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ message: error.message });
    }
  },

  // Retrieve all orders
  findAll: async (req, res) => {
    try {
      const order = await Order.findAll({
        include: [
          {
            model: OrderItem,
            as: "orderItems",
            include: [
              {
                model: CustomizationChoice,
              },
            ],
          },
        ],
      });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Retrieve a single order by id
  findOne: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [
          {
            model: OrderItem,
            as: "orderItems",
            include: [
              {
                model: CustomizationChoice,
              },
            ],
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Update an order
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const [updated] = await Order.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedOrder = await Order.findByPk(id);
        return res.status(200).json(updatedOrder);
      }
      throw new Error("Order not found");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Delete an order
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Order.destroy({
        where: { id: id },
      });
      if (deleted) {
        return res.status(204).send("Order deleted");
      }
      throw new Error("Order not found");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = OrderController;
