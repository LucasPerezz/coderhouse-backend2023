const express = require('express');
const productManager = require('./../manager/ProductManager');
const router = express.Router();




router.get('/', async (req, res) => {
    let productList = await productManager.getProducts();
    console.log(productList)
    res.render('home', {productList});
});

router.get('/realtimeproducts', async (req, res) => {
    let productList = await productManager.getProducts();
    console.log(productList)
    res.render('realTimeProducts', {productList})
})

router.get('/products', async (req, res) => {
    // let productList = await 
    res.render('products', {});
})


module.exports = router;

