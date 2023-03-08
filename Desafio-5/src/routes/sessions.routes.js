const express = require('express');
const userModel = require('../models/users.model');
const cartModel = require('../models/cart.model');
const { createHash, isValidPassword, generateToken, authToken } = require('../utils');
const passport = require('passport');


const router = express.Router();

router.post('/login', passport.authenticate('login', {failureRedirect: 'faillogin'}),async (req, res) => {
    const { email, password } = req.body;

    try {
            const response = await userModel.findOne({
                email: email
            });


            if(!response) return res.status(400).send({message: "User not found"});
            if(!isValidPassword(response, password)) return res.status(403).send({message: "Incorrect password"});
            delete response.password;
            const {first_name, last_name, age} = response;
            const user = {first_name, last_name, age, email};
            req.session.user = user; 
            res.json({msg: "success", data: user});

    } catch (error) {
        console.log(error);
    }
})

router.get('/faillogin', async (req, res) => {
    res.send({error: "Login failed"});
})

router.post('/signup', passport.authenticate("signup", {failureRedirect: '/failsignup'}), async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body;

    try {
        const confirmAdmin = (email) => {
            if(email === "adminCoder@coder.com" && password === "adminCod3r123") {
                return "admin";
            } else {
                return "user";
            }
        }
        const user = {
            first_name,
            email,
            last_name,
            password,
            age
        }

        await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            admin: confirmAdmin(email),
            //cart
        });

        const access_token = generateToken(user)
        res.json({msg: "success", access_token})
    } catch (error) {
        console.log(error);
    }
})

router.get('/failsignup', async (req, res) => {
    console.log("Failed sign up");
    res.send({error: "Failed sign up"});
})

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: "/login"}), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
})

router.get('/current', authToken, (req, res) => {
    res.send({status: "success", payload: req.user});
})

module.exports = router;



