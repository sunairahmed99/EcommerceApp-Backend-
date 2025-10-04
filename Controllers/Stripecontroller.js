import Stripe from 'stripe';
import Payment from '../Models/PaymentSchema.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripepayment = async (req, res) => {
  try {
    const ordernumber = Math.floor(100000 + Math.random() * 900000);
    const userid = req.query.userid;
    const addid = req.query.addid;
    const paystatus = req.query.paystatus || 'pending';
    const pay_method = req.query.payment_method || 'card';
    let amount = parseFloat(req.query.totalAmount);
    const currency = 'pkr';

    if (currency === 'pkr') {
      amount = Math.round(amount * 100); // convert to paisa
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ['card'],
    });

    await Payment.create({
      userid: userid,
      addid: addid,
      payment_method: pay_method,
      totalAmount: amount,
      ordernumber: ordernumber,
      paystatus: paystatus,
      stripePaymentIntentId: paymentIntent.id,
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export default stripepayment;
