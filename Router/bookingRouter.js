const express = require("express");
const { protectRoute } = require("../Controller/authController");
const { createbookingsession } = require("../Controller/bookingController");

const bookingRouter = express.Router();

bookingRouter.post("/createbookingsession" , protectRoute ,createbookingsession)

module.exports = bookingRouter;