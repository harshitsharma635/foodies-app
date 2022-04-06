const express = require("express");
const { isLoggedIn, logout } = require("../Controller/authController");
const { getHomePage, getLoginPage, getSignUpPage, getPlansPage, getForgetPasswordPage, getResetPasswordPage, getProfilePage } = require("../Controller/viewController");

const viewRouter = express.Router();

//viewRouter.route("").get(getDemoPage);
viewRouter.use(isLoggedIn)
viewRouter.route("/").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignUpPage);
viewRouter.route("/plans").get(getPlansPage)
viewRouter.route("/logout").get(logout);
viewRouter.route("/forgetpassword").get(getForgetPasswordPage);
viewRouter.route("/resetpassword/:token").get(getResetPasswordPage);
viewRouter.route("/profile").get(getProfilePage);

module.exports = viewRouter;