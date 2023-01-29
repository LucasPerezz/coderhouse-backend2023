const mongoose = require('mongoose');

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    id:Number,
    products: [{
        id:Number,
        qty:Number
    }]
})

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;