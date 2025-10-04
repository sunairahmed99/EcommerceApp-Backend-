import express from "express";
import { createcart, deletemanycarts, getcartdata, getdeletecartdata } from "../Controllers/CartController.js";

const CartRouter = express.Router();



CartRouter.post('/create',createcart)
CartRouter.get('/get',getcartdata)
CartRouter.delete('/delete',getdeletecartdata)
CartRouter.delete('/deletemany',deletemanycarts)

export default CartRouter