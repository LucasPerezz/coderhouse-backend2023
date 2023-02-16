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

cartsRouter.delete('/api/carts/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.json(await cartsManager.deleteProductInCartSelected(cartId, productId));
})

cartsRouter.put('/api/carts/:cid', async (req, res) => {
    let products = req.body;
    let cartId = req.params.cid;
    res.json(await cartsManager.updateStockOfProductInCartSelected(cartId, products));
})

cartsRouter.put('/api/carts/:cid/products/:pid', async (req, res) => {
    //SOLO Actualiza la cantidad de stock del producto
})

cartsRouter.delete('/api/carts/:cid', async (req, res) => {
    let cartId = req.params.cid;
    res.json(await cartsManager.delelteAllProductsInTheCart(cartId));
})



module.exports = cartsRouter