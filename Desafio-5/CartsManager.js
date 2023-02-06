const cartModel = require('./models/cart.model');
const productManager = require('./ProductManager');

class CartsManager {

    async getAllCarts() {
        try {
            const carts = await cartModel.find();
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }

    async addCart(product) {
        try {
            this.carts = await this.getAllCarts();

            if(!Array.isArray(product)) {
                return "it is not array";
            }

            const newCart = 
                {
                    id: this.carts.length + 1,
                    products: product
                }
            this.carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));

            return {message: "Cart Created"}
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(id) {
        try {
            let cart = await cartModel.findOne(id);
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

            this.carts = await this.getAllCarts();

            const posCart = this.carts.findIndex(c => c.id === cartId);
            if(posCart === -1) return "cart id is incorrect";

            if(!await productManager.getProductById(prodId)) return "The product does not exist"

            const posProduct = this.carts[posCart].products.findIndex(p => p.id === prodId);
            if(posProduct === -1) {
                const newProd = {
                    id: prodId,
                    qty: 1
                }

                this.carts[posCart].products.push(newProd);
            }

            if(!this.carts[posCart].products[posProduct]) {
                this.carts[posCart].products[posProduct] = {
                    ...this.carts[posCart].products[posProduct],
                    qty: 1
                }
            } else {
                this.carts[posCart].products[posProduct].qty++;
            }

            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));

            return {message: "product added"};

        } catch (error) {
            console.log(error);
        }
    }


}

const cartsManager = new CartsManager('./db/Carts_list.json');

module.exports = cartsManager