const express = require('express');
const {addCart, getCarts, getCartById, addProductInCart, deleteProductInCart, updateProductInCart, updateStockOfProduct, deleteAllProductsInCart } = require('../controllers/carts.controller')

const cartsRouter = express.Router();

cartsRouter.post('/', addCart)

cartsRouter.get('/', getCarts)

cartsRouter.get('/:cid', getCartById)

cartsRouter.post('/:cid/product/:pid', addProductInCart)

cartsRouter.delete('/:cid/product/:pid', deleteProductInCart)

cartsRouter.put('/:cid', updateProductInCart)

cartsRouter.put('/:cid/product/:pid', updateStockOfProduct)

cartsRouter.delete('/:cid', deleteAllProductsInCart)



module.exports = cartsRouter