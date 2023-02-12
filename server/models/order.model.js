const mongoose = require('mongoose');
const crypto = require('crypto');

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: Array, required: true };

const OrderSchema = new Schema(

    );

const Order = model("Order", OrderSchema);

module.exports =  Order


 