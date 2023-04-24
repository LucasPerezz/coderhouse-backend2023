const {Router} = require('express');

const {generateProducts, generateUsers} = require('./../utils');

const mocksRouter = Router();

mocksRouter.get('/mockingproducts', (req, res, next) => {
    try {
        let qty = req.query.qty || 50;
        const products = generateProducts(qty);
        res.send({status: 'success', payload: products});
    } catch (error) {
        next(error);
    }
})

mocksRouter.get('/mockingusers', (req, res, next) => {
    try {
        let qty = req.query.qty || 20;
        const users = generateUsers(qty);
        res.send({status: 'success', payload: users});
    } catch (error) {
        next(error);
    }
})

module.exports = mocksRouter;