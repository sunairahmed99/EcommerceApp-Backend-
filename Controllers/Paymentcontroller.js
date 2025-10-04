import Payment from "../Models/PaymentSchema.js";


const createpayment = async(req,res)=>{

    try{

        console.log("pilllayyy")

        
        const ordernumber =  Math.floor(100000 + Math.random() * 900000);
        const userid = req.query.userid;
        const addid = req.query.addid;
        const amount = req.query.totalAmount;
        const paystatus = req.query.paystatus;
        const pay_method = req.query.payment_method;

        console.log(ordernumber);
        console.log(userid);
        console.log(addid);
        console.log(amount);
        console.log(paystatus);
        console.log(pay_method);


        const paydata = await Payment.create({

            'userid':userid,
            'addid':addid,
            'payment_method':pay_method,
            'totalAmount':amount,
            'ordernumber':ordernumber,
            'paystatus':paystatus
        })

        console.log(paydata)

        return res.status(200).json({
            status:"success",
            data:paydata
        })

        



    }catch(err){
        console.log(err)

        return res.status(500).json({

            status:"fail",
            message:"something went wrong try later"
        })
    }
}

export{createpayment}