const productModel = require('../models/product.model');

class ProductManager {

    //Funciona
     async addProduct(product) {
        try {
            const listProducts = await this.getProducts();
            if(listProducts.findIndex(prod => prod.code === product.code) === -1 && validate(product) === 1) {
                if(!product.status) product = {...product, status: true};
                console.log(product)
                await productModel.create(product);
                return {message: "Product added"}
            }
        } catch (error) {
            throw new Error("Error, codigo repetido", error);
        }

    }

    //Funciona
    async getProducts() {
        try {
            const file = await productModel.find();
            console.log(file)
            return file;
        } catch (error) {
            return [];
        }
    }

    //Funciona
    async getProductsWithFilters(limit, page, query, sort) {
        return productModel.paginate(query, {limit, page, sort:{price:sort}, lean: true});
    }


    //Funciona
    async getProductById(id) {
        try {
            let productFound = await productModel.findOne({_id: id});
            if(!productFound) {
                throw new Error("Not found");
            } else {
                return productFound;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Funciona
    async updateProduct(id, product) {
        try {
            let productFound = await productModel.findOne({_id: id});
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

    //Funciona
    async deleteProduct(id) {
        try {
            let productFound = await productModel.findOne({_id: id});
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
    if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
        throw new Error("TODOS los campos son obligatorios!");
    } else {
        return 1;
    }
}


const classControl = new ProductManager();


module.exports = classControl;