import app from "./app.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';


dotenv.config({quiet:true})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const DB = process.env.DATABASE

mongoose.set({strictQuery:true})

try{

    mongoose.connect(DB);
    console.log('connected')


}catch(err){

    console.log('not connected');
}

const port = process.env.PORT || 7000;

app.listen(port,'192.168.100.106',() => {
    console.log(`listening to port ${port}`);
});

// '192.168.100.106'

