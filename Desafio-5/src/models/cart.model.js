const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity: Number
        }],
        default: []
    }
})

cartsSchema.pre('find', function(){
    this.populate('products.product');
})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})


const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;