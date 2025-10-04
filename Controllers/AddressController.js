import Address from "../Models/AddressSchema.js";



const createAddress = async(req,res)=>{

    try{

        const{name,phone,street,House_no,address,userid} = req.body;


        const add = await Address.create({

            'name':name,
            'phone':phone,
            'street':street,
            'House_no':House_no,
            'address':address,
            'userid':userid,
        });

        console.log(add)


        return res.status(200).json({

            status:"success",
            data:add
        })





    }catch(err){

        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getaddress = async(req,res)=>{

    try{

        const id = req.query.id;

        
        const pro = await Address.find({userid:id});

        console.log(pro)


        return res.status(200).json({

            status:"success",
            data:pro
        })



    }catch(err){

        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getdeleteadddata = async(req,res)=>{

    console.log("deletedddddddddddddd")

    try{
        console.log("deletedddddddddddddd")

        let uid = req.query.uid;

        let pid = req.query.pid;

        console.log(uid);
        console.log(pid)




    await Address.findOneAndDelete({ userid: uid,});




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

export{createAddress,getaddress,getdeleteadddata}

