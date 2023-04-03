const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    code:{
        type:Number,
        unique:true
    },
    stock:Number,
    category:String,
    thumbnail:String,
    status:Boolean,
})

productsSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productsSchema);

module.exports = productModel;