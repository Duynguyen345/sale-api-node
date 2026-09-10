const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
console.log(orderController);
console.log(orderController.createOrder);
router.post("/", orderController.createOrder);

module.exports = router;
