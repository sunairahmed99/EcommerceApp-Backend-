import Categories from "../Models/CategorySchema.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'


const createcategory = async(req,res)=>{

    try{

        const { name } = req.body;
        const file = req.file;

         const result = await cloudinary.uploader.upload(file.path, {
            folder: 'categories',
            });

    fs.unlinkSync(file.path);

     const category = await Categories.create({
      'catname':name,
      'catimage': result.secure_url,
    });

    res.status(200).json({
      status: 'Category created successfully',
      data: category,
    });

    }catch(err){
        
        

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

const getcategory = async(req,res)=>{

    try{

        const category = await Categories.find();


        return res.status(200).json({

            status:"success",
            data:category
        })


    }catch(err){

        return res.status(500).json({

            status:"fail",
            message:"something went wrong"
        })
    }
}

export{createcategory,getcategory}

