const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const { faker } = require('@faker-js/faker');
const winston = require('winston');
const config = require('./config/config');

const customLevelsOptions = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors:{
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'grey'
    }
}

const transports = (config.mode == 'DEVELOPMENT') ?
    [
        new winston.transports.Console({
            level: config.debug ? "debug" : "info",
            format: winston.format.combine(winston.format.colorize({colors: customLevelsOptions.colors}), winston.format.simple())
        })
    ]
    :
    [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(winston.format.colorize({colors: customLevelsOptions.colors}), winston.format.simple())
        }),
        new winston.transports.File({
            filename: './logs/error.log',
            level: "error",
            format: winston.format.simple()
        })
    ]

    const logger = winston.createLogger({
        levels: customLevelsOptions.levels,
        transports
    })

const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next();
}

const PRIVATE_KEY = config.private_key;

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


//Testing
const randomRol = () => {
    let roles = ['user', 'admin'];
    let randomIndex = Math.round(Math.random() * roles.length);

    return roles[randomIndex];
}

const generateUser = () => {
    return {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.random.numeric(2),
        password: faker.internet.password(16),
        rol: randomRol()
    }
}

const generateUsers = qty => {
    let users = [];
    for(let i = 0; i < qty; i++) {
        users.push(generateUser());
    }

    return users;
}

const generateProduct = ()=>{
    return {
        _id: faker.random.alphaNumeric(10),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(5),
        price: Number(faker.random.numeric(4)),
        status: true,
        stock: Number(faker.random.numeric(3)),
        category: faker.commerce.department(),
        thumbnails: [faker.image.imageUrl()]
    }
}

const generateProducts = qty=>{
    const products = [];

    for (let i = 0; i < qty; i++) {
        products.push(generateProduct());
    }

    return products;
}

module.exports = {
    createHash,
    isValidPassword,
    generateToken,
    authToken,
    handlePolicies,
    generateUsers,
    generateUser,
    generateProducts,
    generateProduct,
    addLogger
}

