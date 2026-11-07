const orderService = require("../services/orderService");
const { sql } = require("../config/database");

async function createOrder(order, orderDetail){
  const transaction = new sql.Transaction();

try {
    await transaction.begin();

    // query 1
   const request1 = new sql.Request(transaction);

request1.input("orderId", sql.Int, order.orderId);
request1.input("customerId", sql.Int, order.customerId);
request1.input("orderDate", sql.DateTime, order.orderDate);

await request1.query(`
    INSERT INTO Orders(OrderID, CustomerID, OrderDate)
    VALUES (@orderId, @customerId, @orderDate)
`);
    // query 2
        const request2 =new sql.Request(transaction);
 request2.input("orderDetailId", sql.Int, orderDetail.orderDetailId);
request2.input("productName", sql.VarChar, orderDetail.productName);
request2.input("quantity", sql.Int, orderDetail.quantity);
request2.input("orderId", sql.Int, order.orderId);
await request2.query(`
    INSERT INTO OrderDetails
        (OrderDetailID, OrderID, ProductName, Quantity)
    VALUES
        (@orderDetailId, @orderId, @productName, @quantity)
`);
    await transaction.commit();
        return {
    order,
    orderDetail
};

} catch (error) {

    await transaction.rollback();

    throw error;
}

}
module.exports = {
    createOrder
};