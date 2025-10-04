import express from 'express';
const app = express();
import userRouter from './Routes/UserRouter.js';
import cors from 'cors';
import categoryRouter from './Routes/CategoryRouter.js';
import productRouter from './Routes/ProductRouter.js';
import CartRouter from './Routes/CartRouter.js';
import favoriteRouter from './Routes/favoriteRouter.js';
import AddressRouter from './Routes/AddressRouter.js';
import PaymentRouter from './Routes/PaymentRouter.js';
import StripeRouter from './Routes/StripeRouter.js';




app.use(express.json());
app.use(cors())


app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)
app.use('/cart',CartRouter)
app.use('/favorite',favoriteRouter)
app.use('/address',AddressRouter)
app.use('/payment',PaymentRouter)
app.use('/stripepayment',StripeRouter)



export default app;