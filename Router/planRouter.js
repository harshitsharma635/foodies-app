const express = require("express");
const { protectRoute, isAuthenticated } = require("../Controller/authController");

const planRouter = express.Router();

const { 
    getAllPlans,
    getPlanById,
    createPlan,
    updatePlan,
    deletePlan 
} = require("../Controller/planController")

planRouter
.route("")
.get(protectRoute,getAllPlans)
.post(protectRoute,isAuthenticated,createPlan);

planRouter
.route("/:id")
.get(protectRoute,getPlanById)
.patch(protectRoute,isAuthenticated,updatePlan)
.delete(protectRoute,isAuthenticated,deletePlan);



module.exports = planRouter;