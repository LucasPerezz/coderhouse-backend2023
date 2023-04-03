const express = require('express');
const {getProductById, getProducts, postProduct, updateProduct, deleteProduct} = require('./../controllers/products.controllers')
const productsRouter = express.Router();


productsRouter.get('/', getProducts)

productsRouter.get('/:id', getProductById)

productsRouter.post('/', postProduct)

productsRouter.put('/:id', updateProduct)

productsRouter.delete("/:id", deleteProduct)

module.exports = productsRouter


