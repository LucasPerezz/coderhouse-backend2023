const express = require('express');
const cartsManager = require('../manager/CartsManager');
const productManager = require('./../manager/ProductManager');
const messageManager = require('./../manager/MessageManager')
const router = express.Router();





router.get('/', async (req, res) => {
    let productList = await productManager.getProducts();
    console.log(productList)
    res.redirect('/realtimeproducts');
});

router.get('/realtimeproducts', async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.query || '';
    const sort = req.query.sort || 1;

    const productsRes = await fetch(`http://localhost:8080/api/products?limit=${limit}&page=${page}&query=${query}&sort=${sort}`);
    const products = await productsRes.json();

    res.render('realTimeProducts', {products:products.payload});
})

router.get('/products', async (req, res) => {
    const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const query = req.query.query || '';
        const sort = req.query.sort || 1;

        const productsRes = await fetch(`http://localhost:8080/api/products?limit=${limit}&page=${page}&query=${query}&sort=${sort}`);
        const products = await productsRes.json();

        console.log(products)

        products.pagination = {
            active: true,
            prevLink: (products.hasPrevPage) ? `http://localhost:8080/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : '#',
            pagesLinks: [],
            nextLink: (products.hasNextPage) ? `http://localhost:8080/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : '#'
        };

        let numLinkPages = (products.totalPages > 5) ? 5 : products.totalPages;
        let midPageDif = 1;

        for (let i = 1; i <= numLinkPages; i++) {
            let actualPage;                                     
            let middleCicle = Math.ceil(numLinkPages/2); 
            let middlePage = products.page;                 

            if(products.page < middleCicle){
                middleCicle = products.page;
            }else if(products.page > (products.totalPages-middleCicle)){
                middleCicle = numLinkPages-(products.totalPages-products.page);
            }

            if(i < middleCicle){
                actualPage = (middlePage-middleCicle)+midPageDif;
                midPageDif++;
            }else if(i === middleCicle){
                actualPage = middlePage;
                midPageDif=1;
            }else{
                actualPage = middlePage+midPageDif;
                midPageDif++;
            }

        
            let pageLink = {
                page:actualPage,
                link:`http://localhost:8080/products?limit=${limit}&page=${actualPage}&sort=${sort}&query=${query}`,
                active: products.page === actualPage
            }

            products.pagination.pagesLinks.push(pageLink);
        }

        
        if(products.totalPages <= 1) products.pagination.active = false;

        res.render('products', {products: products});
})

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;

        const cartRes = await fetch(`http://localhost:8080/api/carts/${cartId}`);
        let cart = await cartRes.json();

        cart.products.map(prod => {
            prod.totalPrice = (prod.product.price * prod.quantity).toFixed(2)
            return prod
        })

        console.log(cart)
        res.render('cart', {cart: cart, cartId: cartId});
})

router.get('/chat', async (req, res)=>{
    let messages = await messageManager.getMessages();

    res.render('chat', {messages});
})


module.exports = router;

