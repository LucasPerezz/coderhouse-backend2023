const express = require('express');
const ProductManager = require('../manager/ProductManager');
const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
    let {limit, page, query, sort} = req.query;
    let productsList = await ProductManager.getProducts();
    if(limit && !isNaN(limit)) {
        productsList.slice(0, limit);
    }
    if(sort && (sort === 'asc' || sort === 'desc')) {
        if(sort === 'asc') {
            productsList.sort((a, b) => a.price > b.price);
        } else {
            productsList.sort((a, b) => a.price < b.price);
        }
    }
    if(query) {
        productsList.filter(p => p.title == query)
    }
    if(page) {
        //A terminar
    }
    res.json(productsList);
})

productsRouter.get('/:id', async (req, res) => {
    const params = req.params.id;
    res.json(await ProductManager.getProductById(params));
})

productsRouter.post('/', async (req, res) => {
    let product = req.body;
    res.json(await ProductManager.addProduct(product));
})

productsRouter.put('/:id', async (req, res) => {
    let id = req.params.id;
    let product = req.body;
    res.json(await ProductManager.updateProduct(id, product));
})

productsRouter.delete("/:id", async (req, res) => {
    let id = req.params.id;
    res.json(await ProductManager.deleteProduct(id));
})

module.exports = productsRouter


