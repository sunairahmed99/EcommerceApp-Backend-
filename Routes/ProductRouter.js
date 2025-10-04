import express from 'express';
import { createProduct, getDetailsingleproduct, getproduct, getsingleproduct } from '../Controllers/ProductController.js';
import upload from '../Middleware/uploadmiddleware.js';


const productRouter = express.Router();


productRouter.post('/create',upload.array('pimages',3), createProduct)
productRouter.get('/get',getproduct)
productRouter.get('/get/product',getsingleproduct)
productRouter.get('/get/single/product',getDetailsingleproduct)


export default productRouter;