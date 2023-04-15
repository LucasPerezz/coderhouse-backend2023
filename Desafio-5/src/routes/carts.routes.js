const express = require('express');
const {addCart, getCarts, getCartById, addProductInCart, deleteProductInCart, updateProductInCart, updateStockOfProduct, deleteAllProductsInCart } = require('../controllers/carts.controller');
const cartsManager = require('../dao/CartsManager');
const ticketManager = require('../dao/TicketManager');
const userModel = require('../dao/models/users.model');

const cartsRouter = express.Router();

cartsRouter.post('/', addCart)

cartsRouter.get('/', getCarts)

cartsRouter.get('/:cid', getCartById)

cartsRouter.post('/:cid/product/:pid', addProductInCart)

cartsRouter.delete('/:cid/product/:pid', deleteProductInCart)

cartsRouter.put('/:cid', updateProductInCart)

cartsRouter.put('/:cid/product/:pid', updateStockOfProduct)

cartsRouter.delete('/:cid', deleteAllProductsInCart)

cartsRouter.get('/:cid/purchase', async (req, res) => {
    let cartId = req.params.cid;
    let cart = await cartsManager.getCartById(cartId, false);
    let {email} = await userModel.findOne({carts: cartId});
    let total = 0;
    let itemsOutStock = [];

    

    cart.products.forEach((prod) => {
        if(prod.product.stock > 0 || prod.product.stock >= prod.quantity) {
            cartsManager.updateStockOfProductInCartSelected(prod.product.id, {stock: prod.product.stock - prod.quantity});
            cartsManager.deleteProductInCartSelected(cart._id.toString(), prod.product._id.toString());
            total += prod.product.price * prod.quantity;
        } else {
            itemsOutStock.push({
                id: prod.product._id,
                title: prod.product.title,
                stock: prod.product.stock,
                quantity: prod.quantity
            });
        }
    })


    let ticketData = {
        code: `TCKT-${Date.now()}`,
        amount: total,
        purchaser: email
    }

    let ticket = await ticketManager.addTicket(ticketData);

    res.send({status: 'success', payload: {ticket: ticket._id, products_out_of_stock: itemsOutStock}});
})



module.exports = cartsRouter