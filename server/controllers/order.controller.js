const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const CartModel = require("../models/CartModel");
const Order = require("../models/order.model");

router.post("/", authentication, async (req, res) => {
  try {
    const {} = req.body;
    console.log("order controller");
    console.log(req.body);
    const order = await Order.create({ ...req.body, userId: req.body.userId });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

router.get("/", authentication, async (req, res) => {
  try {
    const allorders = await Order.find({ userId: req.body.userId });
    res.send(allorders);
    
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = router;
