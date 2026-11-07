const orderService = require("../services/orderService");



async function createOrder(req, res, next) {
    try {
        const { order, orderDetail } = req.body;
        if (!order || !orderDetail) {
            return res.status(400).json({
                message: "Thiếu thông tin đơn hàng hoặc chi tiết đơn hàng"
            });
        }
        if (!Number.isInteger(order.orderId) || order.orderId <= 0) {
            return res.status(400).json({
                message: "orderId phải là số nguyên dương"
            });
        }

        if (!Number.isInteger(order.customerId) || order.customerId <= 0) {
            return res.status(400).json({
                message: "customerId phải là số nguyên dương"
            });
        }

        if (!Number.isInteger(________) || ________ <= 0) {
            return res.status(400).json({
                message: "orderDetailId phải là số nguyên dương"
            });
        }

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