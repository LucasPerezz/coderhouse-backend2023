const express = require('express');
const {getProductById, getProducts, postProduct, updateProduct, deleteProduct} = require('./../controllers/products.controllers');
const { handlePolicies } = require('../utils');
const productsRouter = express.Router();


productsRouter.get('/', getProducts)

productsRouter.get('/:id', getProductById)

productsRouter.post('/', handlePolicies(['ADMIN']), postProduct)

productsRouter.put('/:id', handlePolicies(['ADMIN']), updateProduct)

productsRouter.delete("/:id", handlePolicies(['ADMIN']), deleteProduct)

module.exports = productsRouter


