const express = require('express');
const userModel = require('../models/users.model');
const cartModel = require('../models/cart.model');


const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userModel.findOne({
            email: email,
            password: password
        });
        req.session.email = email
        req.session.password = password
        if(response) res.json({msg: "success", _id: response._id})
        else res.status(400).json({message: "User not found"})
    } catch (error) {
        console.log(error);
    }
})

router.post('/signup', async (req, res) => {
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



