const router = require('express').Router();
const authorization = require('../middlewares/authorization');
const CartModel = require("../models/CartModel");
const Order = require('../models/order.model');


router.post('/', authorization, async (req, res) => {
    try {
        const {} = req.body;
        console.log("order controller")
        console.log(req.body);
        const order = await Order.create({ ...req.body, userId: req.body.userId });

        return res.status(201).json(order);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error!' });
    }
});


router.get('/', authorization, async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id }).lean().exec();

        return res.status(201).json(order);

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error!' });
    }
});


module.exports = router;