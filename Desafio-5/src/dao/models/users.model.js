const mongoose = require('mongoose');

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    admin: String,
    carts: {
        type:[
            {
                cart: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts", 
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: [],
    }
})

userSchema.pre('find', function() {
    this.populate('carts.cart')
})

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;