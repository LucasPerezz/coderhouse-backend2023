
class ProductManager {
    products;
    static productId = 1;
    constructor() {
        this.products = [];
    }


    async addProduct(product) {
        if(this.products.findIndex(prod => prod.code === product.code) === -1 && validate(product) === 1) {
            product = {...product, id: ProductManager.productId};
            this.products.push(product);
            ProductManager.productId++;
        } else {
            throw new Error("Error, codigo repetido");
        }

    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let productFound = this.products.find(prod => prod.id === id);
        if(productFound === undefined) {
            throw new Error("Not found");
        } else {
            return productFound;
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


const classControl = new ProductManager();
const product = {
    title: "silla",
    description: "Madera",
    thumbnail: "https:www.awdawdadwads.com",
    price: 1300,
    code: 132,
    stock: 10
};

const product2 = {
    title: "mesa",
    description: "Madera",
    thumbnail: "https:www.awdawdadwads.com",
    price: 2000,
    code: 161,
    stock: 10
};

const product3 = {
    title: "Platos",
    description: "Porcelana",
    thumbnail: "https:www.awdawdadwads.com",
    price: 2000,
    code: 241,
    stock: 13
};

classControl.addProduct(product);
classControl.addProduct(product2);
classControl.addProduct(product3);
console.log(classControl.getProducts());
console.log(classControl.getProductById(1));
