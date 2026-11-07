const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware.js");
const orderController = require("../controllers/orderController");



router.post("/", verifyToken, orderController.createOrder);
module.exports = router;