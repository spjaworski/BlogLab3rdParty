import * as express from 'express';
import Stripe from 'stripe'
import * as dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe('sk_test_51MbCSeEj2tcMm6OrN2tmkMsDl55eVwJhROpygHX0QPjJpXahkTJhVp3vQJiXFj3DtcvumVMrF5IEHbwJyDim807X00BNvlxPiG', { apiVersion: '2022-11-15' })

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const paymentFulfilled = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: req.body.amount * 100,
            confirm: true,
            payment_method: req.body.payment_method.id
        });
        res.json(paymentFulfilled);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error: payment not made' })
    }
});

export default router;