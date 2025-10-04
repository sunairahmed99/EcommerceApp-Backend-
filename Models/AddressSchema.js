import mongoose from 'mongoose';


const AddressSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required']
    },
    phone:{
        type:String,
        required:true,
    },
    street:{
        type:String
    },
    House_no:{
        type:String,
        required:[true, "House_no required"],
    },
    address:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    }
})

const Address = mongoose.model('Address',AddressSchema);

export default Address;