import Favorite from "../Models/FavoriteSchema.js";


const createfavorite = async(req,res)=>{

    try{

        console.log("hello")

        const{proid,userid} = req.body;


        const fav = await Favorite.create({
    
            'proid':proid,
            'userid':userid,
        })

        res.status(200).json({

            status:"success",
            data:fav
        })
        console.log(cart);
    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getfavoritedata = async(req,res)=>{

    try{

        let uid = req.query.id;

        console.log(`userid:${uid}`)


        const favdata = await Favorite.find({userid:uid}).populate('proid').populate('userid')

        console.log(favdata)

        

        return res.status(200).json({

            status:"success",
            data:favdata
        })


    }catch(err){


        res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}



const getdeletefavoritedata = async(req,res)=>{

    try{

        let uid = req.query.uid;

        let pid = req.query.pid;

        console.log(uid);
        console.log(pid)




     const pro = await Favorite.findOneAndDelete({ userid: uid,proid:pid});

     console.log(pro)




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




export{createfavorite,getfavoritedata,getdeletefavoritedata}