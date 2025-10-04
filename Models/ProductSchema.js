import mongoose from 'mongoose';


const ProductSchema = mongoose.Schema({
    
    pname:{
        type:String,
        required:[true, 'pname required'],
    },
    pdescription:{
        type:String,
        required:[true, 'pdescription required'],
    },
    pprice:{
        type:Number,
        required:[true, 'pprice required']
    },
    pdiscount:{
        type:Number,
    },
    pdisprice:{
        type:Number,
    },
    psize:{
        type:[String],
        required:[true, 'psize required'],
    },
    pcolor:{
        type:[String],
        required:[true,'pcolor required'],
    },
    pimage:{

        type:[String],
    },
    catid:{
        type:mongoose.Schema.ObjectId,
        ref:'Categories'
    }
})

const Products = mongoose.model('Products',ProductSchema);

export default Products