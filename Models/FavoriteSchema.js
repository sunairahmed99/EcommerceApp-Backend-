import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema({


    proid:{
        type:mongoose.Schema.ObjectId,
        ref:'Products'
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
 
})

const Favorite = mongoose.model('Favorite',favoriteSchema);

export default Favorite