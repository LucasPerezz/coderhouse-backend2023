const passport = require('passport');
const local = require('passport-local');
const userService = require('../dao/models/users.model');
const { createHash, isValidPassword } = require('./../utils');
const GithubStrategy = require('passport-github2');
const config = require('./config');
const cartModel = require('../dao/models/cart.model');

const LocalStrategy = local.Strategy;
const initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: config.github_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: config.github_callback_url
    },  async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userService.findOne({email: profile._json.email});
            if(!user) {
                let createCart = await cartModel.create({})
                let newUser = {
                    first_name: profile._json.name ? profile._json.name : "",
                    last_name: '',
                    age: null,
                    email: profile._json.email,
                    password: '',
                    carts: createCart["_id"]

                }

            let result = await userService.create(newUser);
            done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }))

    //Funciona
    passport.use('signup', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
            const {first_name, last_name, email, age} = req.body;
            try {
                let user = await userService.findOne({email: username});
                if(user) {
                    console.log("User already exits");
                    return done(null, false);
                } else {
                    let createCart = await cartModel.create({})
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: createHash(password),
                        carts: createCart["_id"],
                    }
                    let result = await userService.create(newUser);
                    console.log("registrer " + newUser);
                    return done(null, result);
                }
            } catch (error) {
                return done("Error al obtener el usuario: " + error)
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
         async (username, password, done) => {
        try {
            const user = await userService.findOne({email: username});
            if(!user) {
                console.log("User doesn't exits");
                return done(null, false);
            }
            if(!isValidPassword(user, password)) return done(null, false);

            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    })
}

module.exports = initializePassport;