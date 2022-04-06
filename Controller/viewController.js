const planModel = require("../Model/plansModel");


function getHomePage(req , res){
    res.render("homepage.pug" , {name:req.name})
}

function getLoginPage(req , res){
    res.render("login.pug" , {name:req.name});
}

function getSignUpPage(req , res){
    res.render("signup.pug" , {name:req.name});
}

async function getPlansPage(req , res){
    try {
        let plans = await planModel.find();
        //console.log(plans);
        res.render("plans.pug" , {plans , name : req.name});
    } catch (error) {
        console.log(error);
    }
}

function getForgetPasswordPage(req , res){
    res.render("forgetpassword.pug" , {name : req.name})
}

function getResetPasswordPage(req , res){
    res.render("resetpassword.pug" , {name : req.name});
}

function getProfilePage(req , res){
    res.render("profile.pug" , {user : req.user , name : req.name});
}

module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignUpPage = getSignUpPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getForgetPasswordPage = getForgetPasswordPage;
module.exports.getResetPasswordPage = getResetPasswordPage;
module.exports.getProfilePage = getProfilePage;
