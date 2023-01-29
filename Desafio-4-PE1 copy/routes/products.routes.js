const express = require('express');
const ProductManager = require('../ProductManager');
const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
    let {limit} = req.query;
    const products = await ProductManager.getProducts();
    (limit && !isNaN(limit)) ? res.json(products.slice(0, limit)) : res.json(products);
})

productsRouter.get('/:id', async (req, res) => {
    const params = Number(req.params.id);
    res.json(await ProductManager.getProductById(params));
})

productsRouter.post('/', async (req, res) => {
    let product = req.body;
    res.json(await ProductManager.addProduct(product));
})

productsRouter.put('/:id', async (req, res) => {
    let id = +req.params.id;
    let product = req.body;
    res.json(await ProductManager.updateProduct(id, product));
})

productsRouter.delete("/:id", async (req, res) => {
    let id = +req.params.id;
    res.json(await ProductManager.deleteProduct(id));
})

module.exports = productsRouter


