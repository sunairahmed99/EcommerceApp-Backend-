import Users from "../Models/UserSchema.js";
import bcrypt from 'bcrypt';
import sendMail from "../utils/mailer.js";
import jwt from 'jsonwebtoken';


const createUser = async(req,res)=>{

    try{

        const{name,email,password,phone,cpassword} = req.body;

        

        const existuser = await Users.findOne({email:email,emailverfiedstatus:true});

        if(existuser){

            return res.status(400).json({
                status:"fail",
                message:"user already registered"
            })
        }

        if(password.length <= 4){

            return res.status(400).json({
                status:"fail",
                message:"password greater than 4 characters"
            })
        }

        if(!(password == cpassword)){

            return res.status(400).json({

                status:"fail",
                message:"password conform password not match"

            })
        }

        const hashpass = await bcrypt.hash(password,8)

        const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

        const now = new Date();

        const expdate = new Date(now.getTime() + 10 * 60000);

        try{

            await sendMail({
                to: email,
                subject: `Your verify Code: ${verifycode}`,
                text: `Your verification code is ${verifycode}. It expires in 10 minutes.`,
             
           });


        }catch(error){
            

            return res.status(400).json({
                status:"fail",
                message:"something went wrong try later"
            })
        }

        const user = await Users.create({

            'name':name,
            'email':email,
            'password':hashpass,
            'phone':phone,
            'emailverifycode':verifycode,
            'emailverifyexp':expdate,
        })


        return res.status(200).json({
            status:"success",
            data:user,
        })


    }catch(err){
        

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

const verifyUser = async(req,res)=>{

    try{

        const{verifycode} = req.body;

        if(!verifycode){

            return res.status(400).json({
                status:"fail",
                message:"please provide verify code"
            })
        }

        const user = await Users.findOne({ emailverifycode: verifycode },{emailverfiedstatus:false});


     
            if (!user || user.emailVerifyExpires < new Date()) {

            return res.status(400).json({ 
                success: false, 
                message: "invalid code or expire code please register again " 
            });
        }

             user.emailverifycode = null,
             user.emailverifyexp = null,
             user.emailverfiedstatus = true;
             await user.save();

    
        return res.status(200).json({
            status:"success",
            data:user,
        })


    }catch(err){
        

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

const loginuser = async(req,res)=>{

    try{

        const{email,password} = req.body;

     

        if(!email || !password){

            return res.status(400).json({
                status:"fail",
                message:"please provide email and password"
            })
        }

        const user = await Users.findOne({email:email,emailverfiedstatus:true});

      
        if(!user){

            return res.status(400).json({
                status:"fail",
                message:"email not registered"
            })
        }
    

        const passcheck = await bcrypt.compare(password,user.password);

        if(!passcheck){

            return res.status(400).json({

                status:"fail",
                message:"invalid credentials"
            })
        }

        let token = jwt.sign({id:user._id},process.env.jwtkey,{expiresIn:process.env.expiresin})

        return res.status(200).json({
            status:"success",
            data:user,
            token:token
        })


    }catch(err){
       

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

const verifyuserdata = async(req,res)=>{

    try{

        const id = req.id;

        
        let user = await Users.findById(id);

        if(!user){

            return res.status(400).json({
                status:"fail",
                message:"please login again"
            })
        }

        return res.status(200).json({
            status:"success",
            data:user
        })


    }catch(err){

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

const forgotpassword = async(req,res)=>{

    try{

        const{email} = req.body;

        if(!email){

            return res.status(400).json({
                status:"fail",
                message:"please provide email"
            })
        }

        const verifycode = Math.floor(100000 + Math.random() * 900000).toString();

        const now = new Date();

        const expdate = new Date(now.getTime() + 10 * 60000);

        try{

              await sendMail({
                to: email,
                subject: `Your verify Code: ${verifycode}`,
                text: `Your verification code is ${verifycode}. It expires in 10 minutes.`,
             
           });

           const user = await Users.findOne({email:email,emailverfiedstatus:true});

           if(!user){

            return res.status(400).json({
                status:"fail",
                message:"user not registered"
            })
           }

           user.forgotpasscode = verifycode;
           user.forgotpassexp = expdate;
           await user.save();

           return res.status(200).json({
            status:"succes",
            data:user

           })

    
        }catch(err){

              return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })


        }


    }catch(err){

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

const resetpassword = async(req,res)=>{
    try{

        const{forgotcode,password,cpassword} = req.body;

        if(!forgotcode){

            return res.status(200).json({
                status:"fail",
                message:"please enter 6 digit code"
            })
        }

         const user = await Users.findOne({forgotpasscode:forgotcode },{emailverfiedstatus:false});


     
            if (!user || user.forgotpassexp < new Date()) {

            return res.status(400).json({ 
                status: 'fail', 
                message: "invalid code or expire code please forgot password again " 
            });
        }

        if(!(password == cpassword)){
              return res.status(400).json({ 
                status: 'fail', 
                message: "password conform password not match" 
            });
        }

        const hashpass = await bcrypt.hash(password,8);

         let token = jwt.sign({id:user._id},process.env.jwtkey,{expiresIn:process.env.expiresin})

         user.password = hashpass;
         user.forgotpasscode = null;
         user.forgotpassexp = null;
         await user.save();

        return res.status(200).json({
            status:"success",
            data:user,
            token:token
        })
    }catch(err){
        

        return res.status(500).json({
            status:"fail",
            mesage:"something went wrong"
        })
    }
}

const editprofile = async(req,res)=>{

    try{

        const id = req.id;

        const{name,phone} = req.body;

        const user = await Users.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: name,
                    phone: phone
                }
            },
            {
                new: true,              
                runValidators: true     
            }
        );

        return res.status(200).json({
            status:"success",
            data:user
        })


    }catch(err){

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

const passwordchange = async(req,res)=>{

    try{

        const{oldpassword,newpassword,cpassword} = req.body;
        const id = req.id;

        const user = await Users.findById(id);

        if(!user){

            return res.status(400).json({
                status:"fail",
                message:"please login again"
            })
        }

        if(!oldpassword || !newpassword || !cpassword){

            return res.status(400).json({
                status:"fail",
                message:"please enter fields"
            })
        }

        const passcheck = await bcrypt.compare(oldpassword,user.password);

        if(!passcheck){

               return res.status(400).json({
                status:"fail",
                message:"old password not match"
            })
        }

        if(!(newpassword == cpassword)){

             return res.status(400).json({
                status:"fail",
                message:"password conform password not match"
            })
        }

        const hashpassword = await bcrypt.hash(newpassword,8);

        user.password = hashpassword;
        await user.save();

        return res.status(200).json({
            status:"success",
            data:user
        })

    }catch(err){

        return res.status(500).json({
            status:"fail",
            message:"something went wrong try later",
        })
    }
}



export{createUser,verifyUser,loginuser,verifyuserdata,forgotpassword,resetpassword,editprofile,passwordchange}

