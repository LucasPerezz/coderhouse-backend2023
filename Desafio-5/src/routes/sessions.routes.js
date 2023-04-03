const express = require('express');
const passport = require('passport');
const {login, signup, githubcallback, current, failLogin, failsignup} = require('../controllers/sessions.controller')
const router = express.Router();

router.post('/login', passport.authenticate('login', {failureRedirect: 'faillogin'}), login)

router.get('/faillogin', failLogin)

router.post('/signup', passport.authenticate("signup", {failureRedirect: '/failsignup'}), signup)

router.get('/failsignup', failsignup)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: "/login"}), githubcallback)

router.get('/current', current)

module.exports = router;



