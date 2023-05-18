const { default: mongoose } = require('mongoose');
const productModel = require('./models/product.model');
const CustomError = require('../services/CustomError');
const { invalidId, productNotFound, productAlreadyExist } = require('../services/info');
const EErrors = require('../services/enums');

class ProductManager {

    //Funciona
     async addProduct(product) {

            const listProducts = await this.getProducts();
            if(listProducts.findIndex(prod => prod.code === product.code) === -1 && validate(product) === 1) {
                if(!product.status) product = {...product, status: true};
                console.log(product)
                await productModel.create(product);
                return {message: "Product added"}
            } else {
                CustomError.createError({
                    name: "El producto ya existe",
                    cause: productAlreadyExist(),
                    message: "El producto que desea agregar ya existe",
                    code: EErrors.PRODUCTS.PRODUCT_EXIST
                });
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
        if(!mongoose.Types.ObjectId.isValid(id)) {
            CustomError.createError({
                name: "ID de producto no valido",
                cause: invalidId(id, 'ObjectId'),
                message: "El valor enviado no corresponde a un ID valido",
                code: EErrors.GENERICS.ID_TYPE_NOT_VALID
            });
        }

            let productFound = await productModel.findOne({_id: id});


            if(!productFound) {
                CustomError.createError({
                    name: "No existe el producto",
                    cause: productNotFound(id),
                    message: `No existe producto con el ID: ${id}`,
                    code: EErrors.PRODUCTS.PRODUCT_NOT_FOUND
                })
            } else {
                console.log(productFound);
                return productFound;
            }
    }

    //Funciona
    async updateProduct(id, product) {
            let productFound = await productModel.findOne({_id: id});
            if(!productFound) {
                CustomError.createError({
                    name: "Producto no existe",
                    cause: productNotFound(idToUpdate),
                    message: `Imposible actualizar. No existe producto con el ID ${idToUpdate}`,
                    code: EErrors.PRODUCTS.PRODUCT_NOT_FOUND
                });
            } else {
                if(validate(product) === 1){ 
                    await productModel.updateOne({_id: id}, product);
                    return "Product updated"
                }
            }
    }

    //Funciona
    async deleteProduct(id) {

            let productFound = await productModel.findOne({_id: id});
            if(!productFound) {
                CustomError.createError({
                    name: "Producto no existe",
                    cause: productNotFound(idToDelete),
                    message: `Imposible eliminar. No existe producto con el ID ${idToDelete}`,
                    code: EErrors.PRODUCTS.PRODUCT_NOT_FOUND
                });
            } else {
                await productModel.deleteOne({_id: id});
                return "Product deleted"
            }
    }
}

const validate = (product) => {
    if(!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
        CustomError.createError({
            name: "Faltan Datos",
            cause: missingData(productToAdd, {
                title: "Titulo",
                description: "Descripcion",
                price: 100,
                code: "Codigo",
                stock: 20,
                category: "categoria"
            }),
            message: "No se pudo agregar el producto, debe completar todos los campos.",
            code: EErrors.GENERICS.MISSING_REQUIRED_DATA
        });
    } else {
        return 1;
    }
}


const classControl = new ProductManager();


module.exports = classControl;