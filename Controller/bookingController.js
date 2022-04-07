const planModel = require('../Model/plansModel');
const userModel = require('../Model/usersModel');

const stripe = require('stripe')('sk_test_51Kj0KMSC1smQ9uqpPXPSMeZ35vjDCeKxYHIWyQbOjFSXNvvxC3G5gXWTAc4BmkOJl1NtmiZYmDScc7mEt82az3Vm00IcUBPtSq')

const CHECKOUT_KEY = process.env.CHECKOUT_KEY;

async function createbookingsession(req , res){
    try {
        const userId = req.id;
        const {planId} = req.body;
        let planObj = await planModel.findById(planId);
        let userObj = await userModel.findById(userId);
        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data: {
                  currency: 'usd',
                  product_data: {
                    name: planObj.name,
                  },
                  unit_amount: planObj.price * 100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'https://foodiess-app.herokuapp.com/',
            cancel_url: 'https://foodiess-app.herokuapp.com/'
          });
          // console.log(session);
          // res.redirect(303, session.url);
          res.status(200).json({
              message : "Session created successfully",
              session
          })    
    } catch (error) {
        console.log(error);
        res.json({
            message:"could not create payment session",
            error
        })
    }
}

// async function createNewBooking( req , res){
  
// }

async function checkoutcomplete(req , res){
  console.log("inside checkout complete");
  console.log(req);
  const stripeSignature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, stripeSignature, CHECKOUT_KEY);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log(event);

}

module.exports.createbookingsession = createbookingsession;
module.exports.checkoutcomplete = checkoutcomplete;