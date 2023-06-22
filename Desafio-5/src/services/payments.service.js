const Stripe = require('stripe');

const config = require('./../config/config');
const { getCartById } = require('../controllers/carts.controller');

class PaymentService{
    constructor(){
        this.paymentPlatform = new Stripe(config.stripe_key);
    }

    async createPaymentIntentFromCart(cartId){
        const cart = await getCartById(cartId, true);
        const paymentIntentInfo = {
            amount: 0,
            currency: 'usd',
            metadata:{
                userId: "ID DE MONGO",
                orderDetail: JSON.stringify({
                    producto: cantidad
                }, null, '\t'),
                address: JSON.stringify({
                    street: "Calle falsa",
                    postalCode: "8400",
                    externalNumber: "123"
                }, null, '\t')
            }
        }

        cart.products.forEach(product=>{
            paymentIntentInfo.amount += product.product.price;
        })

        return this.paymentPlatform.paymentIntents.create(paymentIntentInfo);
    }

}

module.exports = PaymentService;