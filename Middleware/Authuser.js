import jwt from 'jsonwebtoken';

const verifyuser = async(req,res,next)=>{

    try{

        const token = req.header('auth-token');

        if(!token){

            return res.status(400).json({
                status:"fail",
                message:"invalid token",
            })
        }

        const existuser = jwt.verify(token,process.env.jwtkey)

        if(!existuser){

            return res.status(400).json({

                status:"fail",
                message:"please login again",
            })
        }

        req.id = existuser.id

        next();


    }
    catch(err){

        return res.status(500).json({
            status:"fail",
            message:"something went wrong"
        })
    }
}

export default verifyuser