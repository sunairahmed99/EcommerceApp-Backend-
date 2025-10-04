import express from 'express';
import stripepayment from '../Controllers/Stripecontroller.js';


const StripeRouter = express.Router();


StripeRouter.post('/create',stripepayment)

export default StripeRouter;