const cartModel = require('./models/cart.model');
const productManager = require('./ProductManager');

class CartsManager {

    async getAllCarts() {
        try {
            const carts = await cartModel.find().populate('products._id');
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }

    async addCart(product) {
        try {
            if(!Array.isArray(product)) {
                return "it is not array";
            }

            await cartModel.create({products: product, qty: 1})

            return {message: "Cart Created"}
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            let cart = await cartModel.findOne({_id: id}).populate('products._id');
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


}

const cartsManager = new CartsManager();

module.exports = cartsManager