const mongoose = require('mongoose');

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    code:Number,
    stock:Number,
    category:String,
    thumbnail:String,
    id:Number,
    status:Boolean,
})


const productModel = mongoose.model(productsCollection, productsSchema);

module.exports = productModel;