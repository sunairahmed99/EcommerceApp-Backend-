import Carts from "../Models/CartSchema.js";


const createcart = async(req,res)=>{

    try{

        console.log("hello")

        const{qty,proid,userid,totalprice,size,color} = req.body;


        const cart = await Carts.create({
    
            'qty':qty,
            'proid':proid,
            'userid':userid,
            'totalprice':totalprice,
            'size':size,
            'color':color
        })

        res.status(200).json({

            status:"fail",
            data:cart
        })
        console.log(cart);
    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getcartdata = async(req,res)=>{

    try{

        let uid = req.query.id;

        console.log(`userid:${uid}`)


        const cartdata = await Carts.find({userid:uid}).populate('proid').populate('userid')

        console.log(cartdata)

        

        return res.status(200).json({

            status:"success",
            data:cartdata
        })


    }catch(err){

        console.log(err)

        res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getdeletecartdata = async(req,res)=>{

    try{

        let uid = req.query.uid;

        let pid = req.query.pid;

        console.log(uid);
        console.log(pid)




    await Carts.findOneAndDelete({ userid: uid,});




        return res.status(200).json({

            status:"deleted success",
            // data:pro
        })

    }catch(err){

        console.log(err)

        res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const deletemanycarts = async(req,res)=>{

    try{

        let uid = req.query.uid;


        console.log(uid);


    await Carts.deleteMany({ userid: uid,});

        return res.status(200).json({

            status:"deleted success",
        })

    }catch(err){

        console.log(err)

        res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}




export{createcart,getcartdata,getdeletecartdata,deletemanycarts}