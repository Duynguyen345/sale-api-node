const orderService = require("../services/orderService");

async function createOrder(req, res, next) {
    try {
        const { order, orderDetail } = req.body;

        const result = await orderService.createOrder(order, orderDetail);

        res.status(201).json({
            message: "Create order successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder
};