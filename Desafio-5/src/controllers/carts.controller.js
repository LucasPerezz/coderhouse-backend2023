const cartsManager = require('../dao/CartsManager')

const addCart = async (req, res, next) => {
    try {
        let product = req.body;
        res.json(await cartsManager.addCart(product));
    } catch (error) {
        next(error);
    }

}

const getCarts = async (req, res, next) => {
    try {
        res.json(await cartsManager.getAllCarts());
    } catch (error) {
        next(error);
    }

}

const getCartById = async (req, res, next) => {
    try {
        let id = req.params.cid;
        res.json(await cartsManager.getCartById(id));
    } catch (error) {
        next(error);
    }

}

const addProductInCart = async (req, res, next) => {
    try {
        let cartId = req.params.cid;
        let productId = req.params.pid;
    
        const cartList = await cartsManager.addProductInCartSelected(cartId, productId)
        res.json(cartList);
    } catch (error) {
        next(error);
    }

}

const deleteProductInCart = async (req, res, next) => {
    try {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        res.json(await cartsManager.deleteProductInCartSelected(cartId, productId));
    } catch (error) {
        next(error);
    }

}

const updateProductInCart = async (req, res, next) => {
    try {
        let products = req.body;
        let cartId = req.params.cid;
        res.json(await cartsManager.updatedProductsInCartSelected(cartId, products));
    } catch (error) {
        next(error);
    }

}

const updateStockOfProduct = async (req, res, next) => {
    try {
        let cartId = req.params.cid;
        let productId = req.params.pid;
        let quantity = req.body;
        res.json(await cartsManager.updateStockOfProductInCartSelected(cartId, productId, quantity))
    } catch (error) {
        next(error);
    }

}

const deleteAllProductsInCart = async (req, res, next) => {
    try {
        let cartId = req.params.cid;
        res.json(await cartsManager.delelteAllProductsInTheCart(cartId));
    } catch (error) {
        next(error);
    }

}


module.exports = {
    addCart,
    getCarts,
    getCartById,
    addProductInCart,
    deleteProductInCart,
    updateProductInCart,
    updateStockOfProduct,
    deleteAllProductsInCart
}

