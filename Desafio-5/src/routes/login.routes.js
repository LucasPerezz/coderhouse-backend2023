const express = require('express');
const userModel = require('./../models/users.model');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userModel.findOne({
            email: email,
            password: password
        });
        req.session.email = email
        req.session.password = password
        if(response) res.status(200).json("success")
        else res.status(400).json({message: "User not found"})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;


