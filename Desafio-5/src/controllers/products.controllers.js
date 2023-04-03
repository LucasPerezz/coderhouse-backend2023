const ProductManager = require('./../dao/ProductManager');


const getProducts = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = (req.query.query) ? JSON.parse(req.query.query) : {};
    const sort = req.query.sort;

    if(!limit && !page && !query && !sort) {
        const products = await ProductManager.getProducts();
        res.json({
            status: 'sucess',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage && `localhost:8080/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`,
            nextLink: products.nextLink && `localhost:8080/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
        })
    } else {
        const products = await ProductManager.getProductsWithFilters(limit, page, query, sort);
        res.json({
            status: 'sucess',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage && `localhost:8080/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}`,
            nextLink: products.nextLink && `localhost:8080/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
        })
    }
}

const getProductById = async (req, res) => {
    const params = req.params.id;
    res.json(await ProductManager.getProductById(params));
}

const postProduct = async (req, res) => {
    let product = req.body;
    res.json(await ProductManager.addProduct(product));
}

const updateProduct = async (req, res) => {
    let id = req.params.id;
    let product = req.body;
    res.json(await ProductManager.updateProduct(id, product));
}

const deleteProduct = async (req, res) => {
    let id = req.params.id;
    res.json(await ProductManager.deleteProduct(id));
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    updateProduct,
    deleteProduct
}