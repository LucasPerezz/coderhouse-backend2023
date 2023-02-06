const mongoose = require('mongoose');

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    id:Number,
    products: [{
        _id: mongoose.Schema.Types.ObjectId,
        qty:Number
    }]
})

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;