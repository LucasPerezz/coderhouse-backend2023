
class ProductManager {
    products;
    static productId = 1;
    constructor() {
        this.products = [];
    }


    addProduct(product) {
        if(this.products.findIndex(prod => prod.code === product.code) === -1) {
            product = {...product, id: ProductManager.productId};
            this.products.push(product);
            ProductManager.productId++;
        } else {
            console.log("Error, codigo repetido");
        }

    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let productFound = this.products.find(prod => prod.id === id);
        if(productFound === undefined) {
            console.log("Not found");
        } else {
            return productFound;
        }
    }
}


const classControl = new ProductManager();
const product = {
    title: "silla",
    description: "Madera",
    price: 1300,
    code: 132,
    stock: 10
}

const product2 = {
    title: "mesa",
    description: "Madera",
    price: 2000,
    code: 161,
    stock: 10
}

classControl.addProduct(product);
classControl.addProduct(product2);
console.log(classControl.getProducts());
console.log(classControl.getProductById(1));
