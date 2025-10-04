import mongoose from "mongoose";

const CartSchema = mongoose.Schema({

    size:{
        type:String,
    },
    color:{
        type:String,
    },
    qty:{
        type:Number
    },
    proid:{
        type:mongoose.Schema.ObjectId,
        ref:'Products'
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:'Users'
    },
    totalprice:{
        type:Number,
    }
})

const Carts = mongoose.model('Carts',CartSchema);

export default Carts