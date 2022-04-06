const userModel = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const SECRET_KEY = process.env.SECRET_KEY;
const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PW = process.env.GMAIL_PW;

async function signup(req , res){
    try {
        let newUser = req.body;
        let user = await userModel.create({
            name : newUser.name,
            email : newUser.email,
            password : newUser.password,
            confirmPassword : newUser.confirmPassword,
            role : newUser.role
        })
        res.status(201).json({
            message : "Successfully signed up!",
            data : user
        }) 
    } catch (error) {
        res.status(501).json({
            message : "could not sign up !",
            error
        })
    }
}

async function login(req , res){
    try {
        let {email , password} = req.body;
        let loggedinUser = await userModel.find({email});
        if (loggedinUser.length) {
            let user = loggedinUser[0];
            if(user.password == password){
                const token = jwt.sign({ id : user["_id"]} , SECRET_KEY);
                res.cookie("jwt" , token , {httpOnly : true});
                res.status(200).json({
                    message : "Successfully logged In!",
                    data : user,
                    token
                })
            }else{
                res.status(200).json({
                    message : "Email and password did not match!"
                })
            }
        } else {
            res.status(200).json({
                message : "No user found!Please sign up first"
            })
        }
    } catch (error) {
        res.status(501).json({
            message : "Login Failed!"
        })
    }
}

async function isLoggedIn(req , res , next){
    try {
        const token = req.cookies.jwt;
        let payLoad =jwt.verify(token , SECRET_KEY);
        if(payLoad){
            let user = await userModel.findById(payLoad.id);
            req.name = user.name;
            req.user = user;
            next();
        }else{
            next();
        }
    } catch (error) {
        next();
    }
}

async function logout(req , res){
    try {
        res.clearCookie("jwt");
        res.redirect("/");
    } catch (error) {
        res.status(501).json({
            error
          })
    }
}

async function protectRoute(req , res , next){
    try {
        // const token = req.headers.authorization.split(" ").pop();
        //console.log("in protect route");
        const token = req.cookies.jwt;
        let payLoad = jwt.verify(token , SECRET_KEY);
        //console.log(payLoad);
        if (payLoad) {
            req.id = payLoad.id;
            next()
        } else {
            res.status(200).json({
                message : "Please Login to Proceed!"
            })
        }
    } catch (error) {
        res.status(501).json({
            message : "Please Login to Proceed!",
            error
        })
    }
}

async function isAuthenticated(req , res , next){
    try {
        const id = req.id
        let user = await userModel.findById(id);
        if (user.role == "admin") {
            next();
        } else {
            res.status(200).json({
                message : "You are not authorized!"
            })
        }

    } catch (error) {
        res.status(501).json({
            message : "Failed to authenticate",
            error
        })
    }
}

// async..await is not allowed in global scope, must use a wrapper
async function send(message) {

    try {
        let transporter = nodemailer.createTransport({
            service : "gmail",
            host: "smtp.ethereal.email",
            secure: true, //true for 465, false for other ports
            auth: {
              user: GMAIL_ID, // generated ethereal user
              pass: GMAIL_PW, // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: message.from, // sender address
            to: message.to, // list of receivers
            subject: message.subject, // Subject line
            text: message.text, // plain text body
            // html: "<b>Hello world?</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
    } catch (error) {
        console.log(error);
    }
}

async function forgetPassword(req , res){

    try {
        let {email} = req.body;
        let user = await userModel.findOne({email : email});
        //console.log(user);
        if(user){
            const token = user.createResetToken();
            //console.log(token);
            await user.save();
            //console.log("user saved!");
            let resetLink = `http://localhost:3000/resetpassword/${token}`;
            let message = {
                from : GMAIL_ID,
                to : email,
                subject : "Password Reset Link",
                text : `Here is your password reset link : ${resetLink} \n This link is valid for 10mins only`
            }
            let response = await send(message);
            res.status(200).json({
                message : "Reset link sent to email!",
                response
            })
        }else{
            res.status(200).json({
                message:"User Not Found ! Please Sign up first !"
              })
        }
    } catch (error) {
        res.status(501).json({
            message : "Failed to forget password",
            error
        })
    }

}

async function resetPassword(req , res){
    try {
        //console.log(req.params);
        const {token} = req.params;
        const { password , confirmPassword } = req.body;
        let user = await userModel.findOne({
            pwToken : token,
            tokenTime : { $gt : Date.now()}
        })
        //console.log(user);
        //console.log(password , confirmPassword);
        if(user){
            user.resetPasswordHandler(password , confirmPassword);
            await user.save();
            res.status(200).json({
                message : "Reset password successful!",
                flag : true
            })
        }else{
            res.status(200).json({
                message : "Reset link expired!",
                flag : false
            })
        }
    } catch (error) {
        res.status(501).json({
            message : "Reset failed!",
            error
        })
    }
}

module.exports.signup = signup;
module.exports.login = login;
module.exports.protectRoute = protectRoute;
module.exports.isAuthenticated = isAuthenticated;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;
module.exports.isLoggedIn = isLoggedIn;
module.exports.logout = logout