const bookingModel = require('../Model/bookingModel');
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
          customer_email : userObj.email,
          client_reference_id: planId,
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


async function checkoutcomplete(req , res){
  try {
    console.log("inside checkout complete");
    //console.log(req.body);
    const sig = req.headers['stripe-signature'];
    const email = req.body.data.object.customer_email;
    const planId = req.body.data.object.client_reference_id;
    await createNewBooking(email , planId);
    
  } catch (error) {
    res.json({
      error
    })
  }
  
}

async function createNewBooking( email , planId){
  try {
    let user = await userModel.findOne({email});
    let plan = await planModel.findById(planId);
    const userId = user["_id"];
    if(user.bookedPlanId == undefined){
      const bookingOrder = {
        userId : userId ,
        bookedPlans : [{planId : planId , planName : plan.name , currentPrice : plan.price}]
      }

      const newBookingOrder = await bookingModel.create(bookingOrder);
      user.bookedPlanId = newBookingOrder["_id"];
      await user.save();
  
    }else{
      let userBookings = await bookingModel.findById(user.bookedPlanId);
      const booking = {
        planId : planId,
        planName : plan.name,
        currentPrice : plan.price
      }
      userBookings.bookedPlans.push(booking);
      userBookings.save();
    }
    
  } catch (error) {
    return error
  }
}

module.exports.createbookingsession = createbookingsession;
module.exports.checkoutcomplete = checkoutcomplete