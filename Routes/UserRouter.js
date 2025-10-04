import express from 'express';
import { createUser, editprofile, forgotpassword, loginuser, passwordchange, resetpassword, verifyUser, verifyuserdata } from '../Controllers/UserController.js';
import verifyuser from '../Middleware/Authuser.js';

const userRouter = express.Router();


userRouter.post('/create',createUser)
userRouter.post('/verify',verifyUser)
userRouter.post('/login',loginuser)
userRouter.post('/forgot',forgotpassword)
userRouter.patch('/resetpass',resetpassword)

userRouter.get('/getdata',verifyuser,verifyuserdata)
userRouter.patch('/edit/profile',verifyuser,editprofile)
userRouter.patch('/edit/password',verifyuser,passwordchange)


export default userRouter