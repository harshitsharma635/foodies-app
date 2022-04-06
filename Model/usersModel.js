const mongoose = require("mongoose");
const crypto = require("crypto")

const DB_LINK = process.env.DB_LINK;

mongoose
.connect(DB_LINK)
.then((db) => {
    console.log("connected to database");
})

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlength : [6,"Password should be greater than 6"],
        required : true
    },
    confirmPassword : {
        type : String,
        minlength : [6 , "Password should be greater than 6"],
        validate : {
            validator : ()=>{
                return this.password == this.confirmPassword ;
            },
            message : "Password didn't match!"
        }
    },
    role : {
        type : String,
        enum : ["admin" , "user" , "restraunt owner" , "delivery boy"],
        default : "user"
    },
    pImage:{
        type:String,
        default:"/images/users/default.jpg"
    },
    pwToken : String,
    tokenTime : String,
    bookedPlanId : String
})

userSchema.pre("save" , function(){
    this.confirmPassword = undefined;
})

userSchema.methods.createResetToken = function(){
    let token = crypto.randomBytes(32).toString("hex");
    let time = Date.now() * 60 * 1000;
    this.pwToken = token;
    this.tokenTime = time;

    return token
}

userSchema.methods.resetPasswordHandler = function(password , confirmPassword){
    this.pwToken = undefined;
    this.tokenTime = undefined;
    this.password = password;
    this.confirmPassword = confirmPassword;
}

let userModel = mongoose.model("userCollection" , userSchema);
module.exports = userModel;