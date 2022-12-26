const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }


     async addProduct(product) {
        try {
            const file = await this.getProducts();
            if(file.findIndex(prod => prod.code === product.code) === -1 && validate(product) === 1) {
                const productId = file.length + 1;
                product = {...product, id: productId};
                file.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(file, null, 2));
            }
        } catch (error) {
            throw new Error("Error, codigo repetido");
        }

    }

    async getProducts() {
        try {
            const file = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(file);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        try {
            const file = await this.getProducts();
            let productFound = file.find(prod => prod.id === id);
            if(productFound === undefined) {
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
            const file = await this.getProducts();
            const pos = file.findIndex(prod => prod.id === id);
            if(pos !== -1) {
                product = {id: file[pos].id, ...product};
                file.splice(pos, 1, product);
                await fs.promises.writeFile(this.path, JSON.stringify(file, null, 2));
            }
        } catch (error) {
            throw new Error("Id no encontrado");
        }
    }

    async deleteProduct(id) {
        try {
            const file = await this.getProducts();
            if(file.findIndex(prod => prod.id === id) !== -1) {
                const deleteProduct = file.filter(prod => prod.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct, null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const validate = (product) => {
    if(!product.title || !product.description || !product.price || !product.code || !product.thumbnail || !product.stock) {
        throw new Error("TODOS los campos son obligatorios!");
    } else {
        return 1;
    }
}


const classControl = new ProductManager("./../db/product_list.json");


module.exports = classControl;