const cartsManager = require('../dao/CartsManager')

const addCart = async (req, res) => {
    let product = req.body;
    res.json(await cartsManager.addCart(product));
}

const getCarts = async (req, res) => {
    res.json(await cartsManager.getAllCarts());
}

const getCartById = async (req, res) => {
    let id = req.params.cid;
    res.json(await cartsManager.getCartById(id));
}

const addProductInCart = async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;

    const cartList = await cartsManager.addProductInCartSelected(cartId, productId)
    res.json(cartList);
}

const deleteProductInCart = async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    res.json(await cartsManager.deleteProductInCartSelected(cartId, productId));
}

const updateProductInCart = async (req, res) => {
    let products = req.body;
    let cartId = req.params.cid;
    res.json(await cartsManager.updatedProductsInCartSelected(cartId, products));
}

const updateStockOfProduct = async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let quantity = req.body;
    res.json(await cartsManager.updateStockOfProductInCartSelected(cartId, productId, quantity))
}

const deleteAllProductsInCart = async (req, res) => {
    let cartId = req.params.cid;
    res.json(await cartsManager.delelteAllProductsInTheCart(cartId));
}

const purchase = async (req, res) => {
    let cartId = req.params.cid;
    let cart = await getCartById(cartId, true);
    let total = 0;
    let itemsOutStock = [];

    cart.products.forEach(async (prod) => {
        if(prod.product.stock > 0 || prod.product.stock >= prod.qty) {
            
        }
    })
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

