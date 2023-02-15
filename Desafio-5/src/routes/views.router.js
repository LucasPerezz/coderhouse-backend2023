const express = require('express');
const productManager = require('./../manager/ProductManager');
const router = express.Router();




router.get('/', async (req, res) => {
    let productList = await productManager.getProducts()
    res.render('home', {productList});
});

router.get('/realtimeproducts', async (req, res) => {
    let productList = await productManager.getProducts()
    res.render('realTimeProducts', {productList})
})


module.exports = router;

