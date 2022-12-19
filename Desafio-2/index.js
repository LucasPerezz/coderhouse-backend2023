const fs = require('fs');

class ProductManager {
    static productId = 1;
    constructor(path) {
        this.path = path;
    }


     async addProduct(product) {
        try {
            const file = await this.getProducts();
            if(file.findIndex(prod => prod.code === product.code) === -1 && validate(product) === 1) {
                product = {...product, id: ProductManager.productId};
                file.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(file, null, 2));
                ProductManager.productId++;
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
                const productFound = file.find(prod => prod.id === id);
                product = {id: productFound.id, ...product};
                file.splice(pos, 1, product);
                                //Ciclo infinito
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


const classControl = new ProductManager("product_list.json");

const main = async () => {
    const product = {
        title: "iPhone Xr",
        description: "64GB",
        price: 320,
        code: 612,
        thumbnail: "awdawdwad",
        stock: 53
    }

    const product2 = {
        title: "iPhone 13",
        description: "512GB",
        price: 1320,
        code: 882,
        thumbnail: "awdawdwad",
        stock: 53
    }

    const product3 = {
        title: "Macbook M1",
        description: "512GB",
        price: 2400,
        code: 1282,
        thumbnail: "awdawdwad",
        stock: 32
    }

    //1- AGREGAR PRODUCTOS (FUNCIONA)
    // await classControl.addProduct(product);
    // await classControl.addProduct(product2);
    // await classControl.addProduct(product3);

    //2- TRAER PRODUCTOS (FUNCIONA)
    // console.log(await classControl.getProducts());

    //3- TRAER PRODUCTO SELECCIONADO (FUNCIONA)
    // console.log(await classControl.getProductById(2));

    //4- ACTUALIZAR PRODUCTO (CICLO INFINITO)
    // await classControl.updateProduct(1, product3);

    // 5- ELIMINAR PRODUCTO SELECCIONADO (FUNCIONA)
    // await classControl.deleteProduct(2);
    // console.log(await classControl.getProductById(2));

    
}

main();