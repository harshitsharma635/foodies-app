const mongoose = require("mongoose");

const DB_LINK = process.env.DB_LINK;

mongoose
.connect(DB_LINK)
.then((db) => {
    console.log("connected to database");
})

//schema
let planSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true ,
        maxlength : [100 , "Your Plan Name is more than 100 characters"]
    },
    duration : {
        type : Number ,
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
    ratings : Number,
    discount : {
        type : Number,
        validate : function(){
            return this.discount < this.price;
        },
        message : "Discount must be less than the price",
    }
})

//schema will compile into collection
const planModel = mongoose.model("PlanCollection" , planSchema);

module.exports = planModel;