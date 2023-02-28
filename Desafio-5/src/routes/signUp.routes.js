const express = require('express');
const cartModel = require('../models/cart.model');
const userModel = require('./../models/users.model')
const router = express.Router();


router.post('/', async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body;

    try {
        const confirmAdmin = (email) => {
            if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
                return "admin";
            } else {
                return "user";
            }
        }
        await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password,
            admin: confirmAdmin(email),
            cart: await cartModel.create({products: []})
        });
        res.json("success")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;