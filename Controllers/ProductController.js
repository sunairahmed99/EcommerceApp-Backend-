import Products from "../Models/ProductSchema.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const createProduct = async(req,res)=>{

    try{

        let{pname,pdescription,pprice,pdiscount,pdisprice,psize,pcolor,catid} = req.body;


         const discountPercentage = parseFloat(pdiscount);
         const originalPrice = parseFloat(pprice);
         const discountedPrice = originalPrice - (originalPrice * discountPercentage / 100);

         const images = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'products',
      });
      images.push(result.secure_url);
      await fs.promises.unlink(file.path);
    }

       if (typeof psize === 'string') {
      psize = psize.split(',').map(s => s.trim());
    }

    if (typeof pcolor === 'string') {
      pcolor = pcolor.split(',').map(c => c.trim());
    }



        const product = await Products.create({

            'pname':pname,
            'pdescription':pdescription,
            'pprice':pprice,
            'pdiscount':pdiscount,
            'pdisprice':discountedPrice,
            'psize':psize,
            'pcolor':pcolor,
            'catid':catid,
            'pimage':images

        })



        return res.status(200).json({
            status:"success",
            data:product

        })

    }catch(err){

    


        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

const getproduct = async(req,res)=>{

    try{

        const product = await Products.find();


        return res.status(200).json({

            status:"success",
            data:product
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getsingleproduct = async(req,res)=>{

    try{

    
        let id = req.query.id;

        console.log(id)

    

        const product = await Products.find({catid:id})

          


        return res.status(200).json({

            status:"success",
            data:product
        })

    


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

    const getDetailsingleproduct = async(req,res)=>{

    try{

    
        let id = req.query.id;



        const product = await Products.findById(id)

       


        return res.status(200).json({

            status:"success",
            data:product
        })

    


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}



export{createProduct,getproduct,getsingleproduct,getDetailsingleproduct}
