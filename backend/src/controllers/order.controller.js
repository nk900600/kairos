const Order = require('./../models/order.model'); // Update the path as necessary

class OrdersController {
    async getAllOrders(req, res) {
        try {
            const orders = await Order.find().populate('items.menuItem');
            res.json(orders);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getOrder(req, res) {
        try {
            const order = await Order.findById(req.params.id).populate('items.menuItem');
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createOrder(req, res) {
        const order = new Order({
            // Populate with data from request body
        });

        try {
            const newOrder = await order.save();
            res.status(201).json(newOrder);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateOrder(req, res) {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteOrder(req, res) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new OrdersController();
