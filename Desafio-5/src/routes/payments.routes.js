const {Router} = require('express');
const PaymentService = require('./../services/payments.service');
const {handlePolicies} = require('../utils');

const paymentsRouter = Router();

const paymentService = new PaymentService();

paymentsRouter.post('/payment-intent', handlePolicies(['USER', 'PREMIUM', 'ADMIN']), async(req, res, next)=>{
    try {
        const cartId = req.body.cartId;
    
        const paymentIntentInfo = await paymentService.createPaymentIntentFromCart(cartId);

        console.log(paymentIntentInfo);

        res.send({status:'success', message:'Payment intent generado.', payload:paymentIntentInfo});
    } catch (error) {
        next(error);
    }
})

module.exports = paymentsRouter;
