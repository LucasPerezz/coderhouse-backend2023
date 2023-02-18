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

    //Funciona
    async addCart(product) {
        try {
            if(!Array.isArray(product)) {
                return "it is not array";
            }
            
            console.log(await cartsManager.getAllCarts())

            await cartModel.create({products: product, quantity: 1})

            return {message: "Cart Created"}
        } catch (error) {
            console.log(error)
        }
    }

    //Funciona
    async getCartById(id) {
        try {
            let cart = await cartModel.findById(id).lean();
            console.log(cart);
            if(!cart) throw new Error("Cart not found")
            else {
                return cart;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Funciona
    async addProductInCartSelected(cartId, prodId) {
        try {

            let cart = await this.getCartById(cartId);
            let productExits = cart.products.find(prod => prod.product._id == prodId);

            if(!!productExits) {
                let productIndex = cart.products.indexOf(productExits);
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({product: prodId, quantity: 1});
            }

            await cartModel.updateOne({_id: cartId}, {products: cart.products});
            return {message: "product added"};

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductInCartSelected(cartId, productId) {
        try {
            const cartSelected = await cartsManager.getCartById(productId);
            const productExits = cartSelected.products.find(prod => prod.product._id == productId);
            if(!!!productExits) throw new Error("No existe el producto")
            const productIndex = cartSelected.products.indexOf(productExits);
            cartSelected.products.splice(productIndex, 1);
            await cartModel.updateOne({_id: cartId}, {products: cartSelected.products});
            return {message: "Product eliminated"}
        } catch (error) {
            console.log(error);
        }
    }

    //Funciona
    async updatedProductsInCartSelected(cartId, products) {
        try {
            let cart = await this.getCartById(cartId);
            let productExits = cart.products.find(prod => prod.product._id == products);
            if(!!productExits) {
                let productIndex = cart.products.indexOf(productExits);
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({product: products, quantity: 1});
            }
            await cartModel.updateOne({_id: cartId}, {products: cart.products});
            return {message: "products updated"}
        } catch (error) {
            console.log(error);
        }
    }

    async updateStockOfProductInCartSelected(cartId, productId, qty) {
        try {
            let cart = await this.getCartById(cartId);
            console.log(cart)
            let product = cart.products.find(prod => prod.product == productId);
            let productIndex = cart.products.indexOf(product);
            cart.products[productIndex].quantity = qty;
            await cartModel.updateOne({_id: cartId}, {products: cart.products})
        } catch (error) {
            throw new Error(error)
        }
    }

    async delelteAllProductsInTheCart(cartId) {
        try {
            await cartModel.updateOne({_id: cartId}, {products: []});
            return {message: "products deleted "}
        } catch (error) {
            console.log(error)
        }
    }


}

const cartsManager = new CartsManager();

module.exports = cartsManager