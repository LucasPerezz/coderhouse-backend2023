const express = require('express');
const ProductManager = require('../manager/ProductManager');
const productModel = require('../models/product.model');
const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {

    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = (req.query.query) ? JSON.parse(req.query.query) : {};
    const sort = req.query.sort;

    if(!limit && !page && !query && !sort) {
        const products = await ProductManager.getProducts();
        res.json({
            status: 'sucess',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage && `localhost:8080/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`,
            nextLink: products.nextLink && `localhost:8080/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
        })
    } else {
        const products = await ProductManager.getProductsWithFilters(limit, page, query, sort);
        res.json({
            status: 'sucess',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage && `localhost:8080/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`,
            nextLink: products.nextLink && `localhost:8080/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
        })
    }

    
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


