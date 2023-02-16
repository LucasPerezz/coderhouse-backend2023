const cartModel = require('./../models/cart.model');
const productManager = require('./ProductManager');

class CartsManager {

    async getAllCarts() {
        try {
            const carts = await cartModel.find();
            console.log(carts)
            return carts;
        } catch (error) {
            return [];
        }
    }

    async addCart(product) {
        try {
            if(!Array.isArray(product)) {
                return "it is not array";
            }
            
            console.log(await cartsManager.getAllCarts())

            await cartModel.create({products: product, qty: 1})

            return {message: "Cart Created"}
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            let cart = await cartModel.findOne({_id: id});
            if(!cart) throw new Error("Cart not found")
            else {
                return cart;
            }
        } catch (error) {
            console.log(error);
        }
    }


    async addProductInCartSelected(cartId, prodId) {
        try {

            const cart = await cartModel.findOne(cartId);
            if(!cart) throw new Error("Cart not found");

            if(!await productManager.getProductById(prodId)) return "The product does not exist";

            const posProduct = cart.products.findIndex(p => p.id === prodId);
            if(posProduct === -1) {
                const newProd = {
                    id: prodId,
                    qty: 1
                }
                cart.products.push(newProd);

                await cart.updateOne({_id: cartId}, cart);
            }

            if(!cart.products[posProduct]) {
                cart.products[posProduct] = {
                    ...cart.products[posProduct],
                    qty: 1,
                }
            } else {
                cart.products[posProduct].qty++;
            }

            await cartModel.updateOne({_id: cartId}, cart);
            return {message: "product added"};

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductInCartSelected(cartId, productId) {
        try {
            const cartSelected = await cartModel.findOne({_id: cartId});
            const deleteProduct = cartSelected.products.map(p => p.product._id !== productId);
            await cartModel.updateOne({_id: cartId}, deleteProduct);
            return {message: "Product eliminated"}
        } catch (error) {
            console.log(error);
        }
    }

    async updatedProductsInCartSelected(cartId, products) {
        try {
            
            if(!Array.isArray(products)) {
                throw new Error("Not array")
            }

            const cartSelected = await cartModel.findOne({_id: cartId});
            cartSelected.products = products;
            await cartModel.updateOne({_id: cartId}, cartSelected);
            return {message: "products updated"}
        } catch (error) {
            console.log(error);
        }
    }

    async updateStockOfProductInCartSelected(cartId, productId) {
        try {
            
        } catch (error) {
            
        }
    }

    async delelteAllProductsInTheCart(cartId) {
        try {
            const cartSelected = await cartModel.findOne({_id: cartId});
            cartSelected.products = [];
            await cartModel.updateOne({_id: cartId}, cartSelected);
            return {message: "products deleted "}
        } catch (error) {
            
        }
    }


}

const cartsManager = new CartsManager();

module.exports = cartsManager