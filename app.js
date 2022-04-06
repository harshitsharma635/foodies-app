const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const viewRouter = require("./Router/viewRouter");
const path = require("path");
const cookieParser = require('cookie-parser');
const bookingRouter = require("./Router/bookingRouter");

const app = express();

//user defined middleware
// app.use(function(req , res , next){
//     console.log("from middleware");
//     next();//used to trigger the next middleware , if not used then the next middleware will not be triggered
// })

app.use(express.json());//a middleware that fills the empty req.body from the incoming request

app.use( express.static("public") )

app.use(cookieParser())

//view engine set
app.set("view engine" , "pug");
//views path defined
app.set("views" , path.join(__dirname , "View"))

app.use("/api/plans" , planRouter);
app.use("/api/users" , userRouter);
app.use("" , viewRouter);
app.use("/api/bookings" , bookingRouter);

let port = process.env.PORT || 3000

app.listen(port , function(){
    console.log("server started at port " , port);
})

//mailtrap , nodemailer
//xdklpwziiddbyrrd