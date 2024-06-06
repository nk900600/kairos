const { Op } = require("sequelize");
const sequelize = require("../db/db");
const { CustomizationChoice, MenuItem } = require("../models/menuItem.model");
const {
  Order,
  OrderItem,
  OrderItemCustomizationsChoice,
  OrderStatuses,
} = require("../models/order.model");
const { TableSession } = require("../models/tableSession.model");
const { Table } = require("../models/table.model");
const { CartItem } = require("../models/cart.model");
const moment = require("moment");
const { calculatePercentageChange } = require("../utils/percentageCount");
const { sendPushNotification } = require("../utils/web-notification");
const { eachDayOfInterval, addDays, format } = require("date-fns");
// const { sendPushNotification } = require("../utils/web-notification");
class OrderController {
  // Create a new order
  async create(req, res) {
    if (
      !req.body?.tableSessionId ||
      !req.body?.orderItems ||
      !req.body?.totalAmount ||
      !req.body?.status
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const { orderItems, ...orderDetails } = req.body;

    const transaction = await sequelize.transaction();

    try {
      const order = await Order.create(
        { ...orderDetails, firmId: req.user.firmId },
        {
          userId: req.user.id,
        }
      );

      // Inside the createOrder method

      const orderItemPromises = orderItems.map(async (item) => {
        const { customizations, ...itemDetails } = item;
        const orderItem = await OrderItem.create(
          {
            ...itemDetails,
            OrderId: order.id,
          },
          { transaction, userId: req.user.id }
        );

        if (customizations && customizations.length > 0) {
          const customizationPromises = customizations.map(
            (customizationChoiceId) =>
              OrderItemCustomizationsChoice.create(
                {
                  OrderItemId: orderItem.id,
                  CustomizationChoiceId: customizationChoiceId,
                },
                { transaction, userId: req.user.id }
              )
          );
          await Promise.all(customizationPromises);
        }

        return orderItem;
      });

      await Promise.all(orderItemPromises);

      //delete all cart item
      await CartItem.destroy(
        {
          where: { tableSessionId: orderDetails.tableSessionId },
        },
        { transaction }
      );

      const tableSession = await TableSession.findByPk(
        orderDetails.tableSessionId,
        { transaction }
      );
      tableSession.orderCount += 1;
      await tableSession.save();

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
              {
                model: MenuItem,
              },
            ],
          },
        ],
      });

      sendPushNotification(
        { title: "Great!", body: "New Order placed" },
        req.user.firmId,
        8
      );
      sendPushNotification(
        { title: "Great!", body: "New Order placed" },
        req.user.firmId,
        1
      );

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
        where: { firmId: req.user.firmId },
        include: [
          {
            model: OrderItem,
            as: "orderItems",
            include: [
              {
                model: CustomizationChoice,
              },
              {
                model: MenuItem,
              },
            ],
          },
          {
            model: TableSession,
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
          { transaction, userId: req.user.id }
        );

        if (customizations && customizations.length > 0) {
          const customizationPromises = customizations.map(
            (customizationChoiceId) =>
              OrderItemCustomizationsChoice.create(
                {
                  OrderItemId: orderItem.id,
                  CustomizationChoiceId: customizationChoiceId,
                },
                { transaction, userId: req.user.id }
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
              {
                model: MenuItem,
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
      const transaction = await sequelize.transaction();
      const order = await Order.findOne({ where: { id: id }, transaction });

      if (!order) {
        throw new Error("Order not found");
      }

      // Delete the order
      const deleted = await Order.destroy({ where: { id: id }, transaction });

      // Commit the transaction

      const tableSession = await TableSession.findByPk(order.tableSessionId, {
        transaction,
      });
      tableSession.orderCount -= 1;
      await tableSession.save();
      await transaction.commit();

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
      if (!("isCompleted" in req.body)) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const orderItem = await OrderItem.findByPk(orderItemId);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      orderItem.isCompleted = req.body?.isCompleted;
      await orderItem.save();
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
    let { startDate, endDate } = req.query;

    try {
      // Validate the query parameters
      if (!startDate || !endDate) {
        return res.status(400).json({
          error: "Please provide both startDate and endDate query parameters.",
        });
      }

      startDate = new Date(startDate);
      startDate.setHours(0, 0, 0, 0); // Set the time to 12:00 AM

      endDate = new Date(endDate);
      endDate.setHours(23, 59, 0, 0);

      // Query the database for average ratings
      const orders = await Order.findAll({
        where: {
          firmId: req.user.firmId,
          orderDate: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
        },
        include: [
          {
            model: OrderItem,
            as: "orderItems",
            include: [
              {
                model: CustomizationChoice,
              },
              {
                model: MenuItem,
              },
            ],
          },
          {
            model: TableSession,
          },
        ],
        order: [
          ["orderDate", "ASC"], // Order by the orderDate in ascending order
        ],
      });

      const previousMonthStart = moment()
        .subtract(1, "month")
        .startOf("month")
        .toDate();
      const previousMonthEnd = moment()
        .subtract(1, "month")
        .endOf("month")
        .toDate();

      const ordersPreviousMonth = await Order.findAll({
        where: {
          firmId: req.user.firmId,
          orderDate: {
            [Op.between]: [previousMonthStart, previousMonthEnd],
          },
        },
        order: [
          ["orderDate", "ASC"], // Order by the orderDate in ascending order
        ],
      });
      // Format the response

      const percentageChange = calculatePercentageChange(
        orders.length,
        ordersPreviousMonth.length
      );
      const percentageAmountChange = calculatePercentageChange(
        orders.reduce((acc, val) => acc + val.totalAmount, 0),
        ordersPreviousMonth.reduce((acc, val) => acc + val.totalAmount, 0)
      );

      return res.status(200).json({
        allorders: orders,
        percentage: percentageChange.toFixed(1),
        amountPercentage: percentageAmountChange.toFixed(1),
      });
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAverageServiceTime(req, res) {
    let { startDate, endDate } = req.query;

    try {
      startDate = new Date(startDate);
      startDate.setHours(0, 0, 0, 0); // Set the time to 12:00 AM

      endDate = new Date(endDate);
      endDate.setHours(23, 59, 0, 0);

      const days = eachDayOfInterval({ start: startDate, end: endDate });
      const dailyServiceTimeMetrics = [];
      let cumulativeServiceTime = 0;
      let cumulativeOrders = 0;

      for (const day of days) {
        const dayStart = new Date(day);
        const dayEnd = addDays(day, 1);

        const orders = await Order.findAll({
          where: {
            firmId: req.user.firmId,
            orderDate: {
              [Op.gte]: dayStart,
              [Op.lt]: dayEnd,
            },
            status: OrderStatuses.COMPLETED, // Ensure only completed orders are considered
          },
        });

        const totalServiceTime = orders.reduce((acc, order) => {
          const startTime = new Date(order.orderDate);
          const endTime = new Date(order.updatedAt);
          const serviceTime = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes
          return acc + serviceTime;
        }, 0);

        const currentDayOrders = orders.length;

        if (currentDayOrders > 0) {
          cumulativeServiceTime += totalServiceTime;
          cumulativeOrders += currentDayOrders;
        }
        const averageServiceTime =
          cumulativeOrders > 0 ? cumulativeServiceTime / cumulativeOrders : 0;

        dailyServiceTimeMetrics.push({
          date: format(dayStart, "yyyy-MM-dd"),
          averageServiceTime,
          ordersPerDay: currentDayOrders,
        });
      }
      const averageServiceTime =
        cumulativeOrders > 0 ? cumulativeServiceTime / cumulativeOrders : 0;
      return res
        .status(200)
        .json({ averageServiceTime, dailyServiceTimeMetrics });
    } catch (error) {
      console.error("Error fetching average ratings:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateOrderStatus(req, res) {
    const { orderId } = req.params;

    try {
      const orderItem = await Order.findByPk(orderId);
      if (!orderItem) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (req.body?.status) {
        orderItem.status = req.body?.status;
        await orderItem.save();
      }
      return res.status(200).json(orderItem);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new OrderController();
