import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required'],
    },
    email:{
        type:String,
        required:[true, 'email required']
    },
    phone:{
        type:String,
        required:[true, 'phone required'],
    },
    password:{
        type:String,
        required:[true, 'password required']
    },
    role:{
        type:String,
        default:'user'
    },
    emailverfiedstatus:{
        type:Boolean,
        default:false
    },
    emailverifycode:{
        type:Number,
    },
    emailverifyexp:{
        type:Date
    },
    forgotpasscode:{
        type:String
    },
    forgotpassexp:{
        type:Date
    }
})

const Users = mongoose.model('Users',userSchema);

export default Users