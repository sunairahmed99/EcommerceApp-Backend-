import express from 'express';
import { createAddress, getaddress, getdeleteadddata } from '../Controllers/AddressController.js';


const AddressRouter = express.Router();


AddressRouter.post('/create',createAddress);
AddressRouter.get('/get',getaddress);
AddressRouter.delete('/delete',getdeleteadddata);

export default AddressRouter;