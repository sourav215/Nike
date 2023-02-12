const paymentRouter = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order.model");
require("dotenv").config();

//Saving the order id to use it for verification purpose
let order_id;

paymentRouter.get("/get-razorpay-key", (req, res) => {
  console.log("key");
  console.log("getKey payment");

  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

paymentRouter.post("/create-order", async (req, res) => {
  console.log("create payment");
  console.log(process.env.RAZORPAY_KEY_ID);
  console.log(process.env.RAZORPAY_SECRET);
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    console.log("error in create order")
    res.status(500).send(error);
  }
});

paymentRouter.post("/pay-order", async (req, res) => {
  console.log("payorder payment");

  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

paymentRouter.get("/list-orders", async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

module.exports = paymentRouter;
