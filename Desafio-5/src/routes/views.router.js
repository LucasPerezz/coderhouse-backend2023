const express = require('express');
const { listProductsView, productsView, productDetail, cartDetail, chat, signup, login, logout, auth } = require('../controllers/views.controller');
const router = express.Router();



router.get('/', auth, productsView)

router.get('/product/:id', productDetail)

router.get('/carts/:cid', cartDetail)

router.get('/chat', chat)

router.get('/sessions/signup', signup)

router.get('/sessions/login', login)


router.get('/sessions/logout', logout)





module.exports = router;






