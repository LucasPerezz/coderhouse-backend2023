const mongoose = require('mongoose');

const cartsCollection = 'carts'

const cartsSchema = new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"products",
                    qty:Number,
                }
            }
            ],
            default: []
    }    
})

// cartsSchema.pre('find', () => {
//     this.populate('products.product')
// })

// cartsSchema.pre('findOne', () => {
//     this.populate('products.product')
// })

const cartModel = mongoose.model(cartsCollection, cartsSchema);

module.exports = cartModel;