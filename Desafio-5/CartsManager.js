const fs = require('fs')
const productManager = require('./ProductManager');

class CartsManager {
    static cartsId = 1;
    constructor(path) {
        this.path = path;
        this.carts = [];
    }


    async getAllCarts() {
        try {
            this.carts = await fs.promises.readFile(this.path, "utf-8");
            return JSON.parse(this.carts);
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
            this.carts = await this.getAllCarts();
            let cartFound = this.carts.find(c => c.id === id);
            if(cartFound === undefined) throw new Error("Not found");
            return cartFound;
        } catch (error) {
            console.log(error);
        }
    }


    async addProductInCartSelected(cartId, prodId) {
        try {

            this.carts = await this.getAllCarts();

            const posCart = this.carts.findIndex(c => c.id === cartId);
            if(posCart === -1) return "cart id is incorrect";

            //REVISAR
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