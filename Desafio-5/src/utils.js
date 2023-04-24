const bcrypt = require('bcrypt');
const jtw = require('jsonwebtoken');
const config = require('./config/config');
const { faker } = require('@faker-js/faker');

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
    generateProduct
}

