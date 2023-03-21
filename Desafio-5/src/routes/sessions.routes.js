const express = require('express');
const userModel = require('../models/users.model');
const cartModel = require('../models/cart.model');
const { createHash, isValidPassword, generateToken, authToken } = require('../utils');
const passport = require('passport');


const router = express.Router();

router.post('/login', passport.authenticate('login', {failureRedirect: 'faillogin'}),async (req, res) => {
    if(!req.user) {
        return res.status(400).send({status: "Error", error: "Usuario no encontrado"});
    }

    const userFound = await userModel.findOne({email: req.body.email})
    console.log(userFound);

    req.session.user = {
        first_name: userFound.first_name,
        last_name: userFound.last_name,
        email: userFound.email,
        age: userFound.age,
    }

    req.session.admin = true;

    const access_token = generateToken({
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age
    });

    return res.send({msg: "success", access_token});

})

router.get('/faillogin', async (req, res) => {
    res.send({error: "Login failed"});
})

router.post('/signup', passport.authenticate("signup", {failureRedirect: '/failsignup'}), async (req, res) => {
    const access_token = generateToken(req.body);

    res.send({msg: "success", access_token});
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

// router.get('/current', passport.authenticate('jtw', {session: false}), (req, res) => {
//     res.send({status:'success', payload:req.user});
// })

module.exports = router;



