const express = require('express');
const cartsManager = require('../manager/CartsManager')

const cartsRouter = express.Router();

cartsRouter.post('/', async (req, res) => {
    let product = req.body;
    res.json(await cartsManager.addCart(product));
})

cartsRouter.get('/', async (req, res) => {
    res.json(await cartsManager.getAllCarts());
})


cartsRouter.get('/:cid', async (req, res) => {
    let id = req.params.cid;
    res.json(await cartsManager.getCartById(id));
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;

    const cartList = await cartsManager.addProductInCartSelected(cartId, productId)
    res.json(cartList);
})

cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    res.json(await cartsManager.deleteProductInCartSelected(cartId, productId));
})

cartsRouter.put('/:cid', async (req, res) => {
    let products = req.body;
    let cartId = req.params.cid;
    res.json(await cartsManager.updateStockOfProductInCartSelected(cartId, products));
})

cartsRouter.put('/:cid/product/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let quantity = req.body;
    res.json(await cartsManager.updateStockOfProductInCartSelected(cartId, productId, quantity))
})

cartsRouter.delete('/:cid', async (req, res) => {
    let cartId = req.params.cid;
    res.json(await cartsManager.delelteAllProductsInTheCart(cartId));
})



module.exports = cartsRouter