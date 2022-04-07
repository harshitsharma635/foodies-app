const express = require("express");
const { protectRoute } = require("../Controller/authController");
const { createbookingsession, checkoutcomplete } = require("../Controller/bookingController");

const bookingRouter = express.Router();

bookingRouter.post("/createbookingsession" , protectRoute ,createbookingsession);
bookingRouter.post("/checkoutcomplete" , checkoutcomplete)

module.exports = bookingRouter;