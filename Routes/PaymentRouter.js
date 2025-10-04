import express from 'express';
import { createpayment } from '../Controllers/Paymentcontroller.js';


const PaymentRouter = express.Router();


PaymentRouter.post('/create',createpayment);

export default PaymentRouter