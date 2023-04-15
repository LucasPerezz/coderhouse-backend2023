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
    rol: {
        type: String,
        default: 'user'
    },
    carts: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
})

userSchema.pre('find', function() {
    this.populate('carts.cart')
})

const userModel = mongoose.model(userCollection, userSchema);

module.exports = userModel;