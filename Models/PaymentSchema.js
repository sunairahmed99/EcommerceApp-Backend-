import mongoose from 'mongoose';

const PaymentSchema = mongoose.Schema({
    
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"Users",
        required:[true, 'userid required']
    },
    addid:{
        type:mongoose.Schema.ObjectId,
        ref:'Address',
        required:[true, 'addid required'],
    },
    payment_method:{
        type:String,
        required:[true, 'payment method required']
    },
    paystatus:{
        type:String,
    },
    totalAmount:{
        type:Number,
        required:[true, 'Amount required'],
    },
    ordernumber:{
        type:String,
        required:[true, 'ordernumber required']
    }
})

const Payment = mongoose.model('Payment',PaymentSchema)

export default Payment