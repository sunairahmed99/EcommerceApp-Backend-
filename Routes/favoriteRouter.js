import express from "express";
import { createfavorite, getdeletefavoritedata, getfavoritedata } from "../Controllers/Favoritecontroller.js";



const favRouter = express.Router();



favRouter.post('/create',createfavorite)
favRouter.get('/get',getfavoritedata)
favRouter.delete('/delete',getdeletefavoritedata)

export default favRouter