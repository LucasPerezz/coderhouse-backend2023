const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const config = require('./config/config');

const PRIVATE_KEY = "coderhouse";

const generateToken = (user) => {
    const expirationTime = new Date();
    user.expirationTime = expirationTime;
    const token = jtw.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
    return token;
}

const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({error: "Not authenticated"});

    const token = authHeader.split(" ")[1];
    jtw.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: "Not authorized"});
        req.user = credentials.user;
        next();
    })
}

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const handlePolicies = policies => (req, res, next) => {
    if(policies.includes("PUBLIC")) return next();

    if(!!!req.user) return res.status(401).send({status:"error", msg:"Unauthorized"});

    if(!policies.includes(req.user.rol.toUpperCase())) return res.status(403).send({status:"error", msg:"No tiene permisos suficientes."});

    next();
}

module.exports = {
    createHash,
    isValidPassword,
    generateToken,
    authToken,
    handlePolicies
}

