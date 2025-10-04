import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({

    catname:{

        type:String,
        required:[true, 'catname required']
    },

    catimage:{
        type:String
    }
})

const Categories = mongoose.model("Categories",categorySchema);

export default Categories