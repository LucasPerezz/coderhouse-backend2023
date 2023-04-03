const userModel = require('../dao/models/users.model');
const { createHash, isValidPassword, generateToken, authToken } = require('../utils.js');

const login = async (req, res) => {
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

}

const failLogin = async (req, res) => {
    res.send({error: "Login failed"});
}

const signup = async (req, res) => {
    const access_token = generateToken(req.body);

    res.send({msg: "success", access_token});
}

const failsignup = async (req, res) => {
    console.log("Failed sign up");
    res.send({error: "Failed sign up"});
}

const githubcallback = async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
}

const current = (req, res) => {
    console.log(req.session.user);
    res.status(200).send({user: req.session.user});
}

module.exports = {
    login,
    signup,
    githubcallback,
    current,
    failLogin,
    failsignup
}