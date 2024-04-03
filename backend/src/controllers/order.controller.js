const { Op } = require("sequelize");
const sequelize = require("../db/db");
const { CustomizationChoice } = require("../models/menuItem.model");
const {
  Order,
  OrderItem,
  OrderItemCustomizationsChoice,
} = require("../models/order.model");

class OrderController {
  // Create a new order
  async create(req, res) {
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
  }

  // Retrieve all orders
  async findAll(req, res) {
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
  }

  async createOrderItem(req, res) {
    const transaction = await sequelize.transaction();
    try {
      if (!req.body?.orderItems) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const order = await Order.findByPk(req.params.id, {});

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const orderItemPromises = req.body?.orderItems.map(async (item) => {
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

      const updatedOrder = await Order.findByPk(order.id, {
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

      return res.status(200).json(updatedOrder);
    } catch (error) {
      await transaction.rollback();
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve a single order by id
  async findOne(req, res) {
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
  }
  async findOneOrderItem(req, res) {
    try {
      const orderItem = await OrderItem.findByPk(req.params.id, {
        include: [
          {
            model: CustomizationChoice,
          },
        ],
      });

      if (!orderItem) {
        return res.status(404).json({ message: "OrderItem not found" });
      }
      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete an order
  async delete(req, res) {
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
  }

  async updateOrderItem(req, res) {
    const { orderItemId } = req.params;

    try {
      const orderItem = await OrderItem.findByPk(orderItemId);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      if (req.body?.isCompleted) {
        orderItem.isCompleted = req.body?.isCompleted;
        await orderItem.save();
      }
      if ("quantity" in req.body) {
        if (req.body?.quantity == 0) {
          const orderItem = await OrderItem.destroy({
            where: { id: orderItemId },
          });
          return res.status(200).json(orderItem);
        }

        orderItem.quantity = req.body?.quantity;
        await orderItem.save();
      }

      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateCustomization(req, res) {
    const { orderItemId } = req.params;
    const { customizations } = req.body;

    try {
      await OrderItemCustomizationsChoice.destroy({
        where: { OrderItemId: orderItemId },
      });

      // Create new customizations
      const newCustomizations = customizations.map((customization) => ({
        CustomizationChoiceId: customization,
        OrderItemId: orderItemId,
      }));
      const items = await OrderItemCustomizationsChoice.bulkCreate(
        newCustomizations
      );
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async GetOrderBetweenDatesRange(req, res) {
    const { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      // Query the database for average ratings
      const orders = await Order.findAll({
        where: {
          orderDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
        order: [
          ["orderDate", "ASC"], // Order by the orderDate in ascending order
        ],
      });
      // Format the response

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new OrderController();
