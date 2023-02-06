const productModel = require('./models/product.model');

class ProductManager {
     async addProduct(product) {
        try {
            const listProducts = await this.getProducts();
            if(listProducts.findIndex(prod => prod.code === product.code) === -1 && validate(product) === 1) {
                if(!product.status) product = {...product, status: true};
                await productModel.create(product);
                return {message: "Product added"}
            }
        } catch (error) {
            throw new Error("Error, codigo repetido");
        }

    }

    async getProducts() {
        try {
            const file = await productModel.find();
            return JSON.parse(file);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        try {
            let productFound = await productModel.findOne(id)
            if(!productFound) {
                throw new Error("Not found");
            } else {
                return productFound;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, product) {
        try {
            let productFound = await productModel.find(id);
            if(!productFound) throw new Error("Product not found");
            else {
                if(validate(product) === 1){ 
                    await productModel.updateOne({_id: id}, product);
                    return "Product updated"
                }
            }
        } catch (error) {
            throw new Error("Product not found");
        }
    }

    async deleteProduct(id) {
        try {
            let productFound = await productModel.findOne(id);
            if(!productFound) throw new Error("Product not found")
            else {
                await productModel.deleteOne({_id: id});
                return "Product deleted"
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const validate = (product) => {
    if(!product.title || !product.description || !product.price || !product.code || !product.thumbnail || !product.stock || !product.category) {
        throw new Error("TODOS los campos son obligatorios!");
    } else {
        return 1;
    }
}


const classControl = new ProductManager();


module.exports = classControl;