const cartsManager = require('./../dao/CartsManager');
const productManager = require('./../dao/ProductManager');
const messageManager = require('./../dao/MessageManager');


const listProductsView = async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const query = req.query.query || '';
    const sort = req.query.sort || 1;

    const productsRes = await fetch(`http://localhost:8080/api/products?limit=${limit}&page=${page}&query=${query}&sort=${sort}`);
    const products = await productsRes.json();

    res.render('realTimeProducts', {products:products.payload});
}

const productsView = async (req, res) => {
    const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const query = req.query.query || '';
        const sort = req.query.sort || 1;

        const productsRes = await fetch(`http://localhost:8080/api/products?limit=${limit}&page=${page}&query=${query}&sort=${sort}`);
        const products = await productsRes.json();

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



        res.render('products', {products: products, user: req.session.user});
}

const productDetail = async (req, res) => {
    let productId = req.params.id;

    const product = await productManager.getProductById(productId);
    console.log(product.title)
    const productInMemory = {
        title: product.title,
        price: product.price,
        image: product.thumbnail
    }
    res.render('productDetail', {product: productInMemory});
}

const cartDetail = async (req, res) => {
    const cartId = req.params.cid;

        const cart = await cartsManager.getCartById(cartId)
        console.log(cart.products);
        
        let products = []

        cart.products.forEach(prod => {
            
            products.push({
                title: prod.product.title,
                price: prod.product.price,
                quantity: prod.quantity,
                totalPrice: (prod.product.price * prod.quantity).toFixed(2)
            })
        })

        
        res.render('cart', {cart: products, cartId: cartId});
}

const chat = async (req, res)=>{
    let messages = await messageManager.getMessages();

    res.render('chat', {messages});
}

const signup = async (req, res) => {
    res.render('signUp', {title: 'sign up'})
}

const login = async (req, res) => {
    res.render('login', {title: 'login'})
}

const logout = async (req, res) => {
    req.session.destroy(err => {
        if(err) res.send({status:'error', message:'Error al cerrar la sesión: '+err});

        res.redirect('/sessions/login');
    })
}

function auth(req, res, next) {
    if(req.session.user) {
        return next();
    }
    res.redirect('/sessions/login')
}

module.exports = {
    listProductsView,
    productsView,
    productDetail,
    cartDetail,
    chat,
    signup,
    login,
    logout,
    auth
}


