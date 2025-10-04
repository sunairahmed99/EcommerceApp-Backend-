import express from 'express';
import { createcategory, getcategory } from '../Controllers/Categorycontroller.js';
import upload from '../Middleware/uploadmiddleware.js';


const categoryRouter = express.Router();



categoryRouter.post('/create',upload.single('image'),createcategory);
categoryRouter.get('/get',getcategory);


export default categoryRouter;