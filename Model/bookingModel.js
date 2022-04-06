const mongoose = require("mongoose");

const DB_LINK = process.env.DB_LINK;

mongoose
.connect(DB_LINK)
.then( db => {
    console.log("connected to database");
})

//booked plan Schema
let bookedPlanSchema = new mongoose.Schema({
    planId : {
        type : String,
        required : true
    },
    planName : {
        type : String,
        required : true
    },
    currentPrice : {
        type : String,
        required : true
    },
    bookedOn : {
        type : String ,
        default : Date.now()
    }
})

//booking schema
let bookingSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    bookedPlans : {
        type : [bookedPlanSchema],
        required : true
    }
})

const bookingModel = mongoose.model( "BookingCollection" , bookingSchema);

module.exports = bookingModel;