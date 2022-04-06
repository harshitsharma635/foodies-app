// let plans = require("../Model/plansModel");
// const { v4: uuidv4 } = require('uuid');
// const fs = require("fs");
// let path = require("path");
// let plansPath = path.join(__dirname , ".." , "Model" , "plansModel.json");

const planModel = require("../Model/plansModel");

async function createPlan(req , res){
    //console.log(req.body);
    try {
        let sentPlan = req.body.planDetails;
        let plan = await planModel.create(sentPlan);
        res.status(200).json({
            message : "Successfully created plan!",
            data : plan
        })
    } catch (error) {
        res.status(501).json({
            message : "failed to create a plan !" ,
            error : error
        })
    }
    
}

async function getAllPlans(req , res){
    try {
        let plans = await planModel.find({});
        res.status(200).json({
            message : "Successfully recieved all plans!",
            data : plans
        })
    } catch (error) {
        res.status(404).json({
            message : "No plan Found!" ,
            error : error
        })
    }
}

async function getPlanById(req , res){
    try {
        let {id} = req.params;
        let plan = await planModel.findById(id).exec();
        res.status(200).json({
            message : "Successfully recieved plan with id",
            data : plan
        })
    } catch (error) {
        res.status(404).json({
            message : "No plan Found!" ,
            error : error
        })
    }
}


async function updatePlan(req , res){

    try {
        let {id} = req.params;
        let plan = await planModel.findById(id);
        let updateObj = req.body.planDetails;
        // let updatedPlan = await planModel.findByIdAndUpdate(id , updateObj , {new : true});
        for(key in updateObj){
            plan[key] = updateObj[key];
        }
        let updatedPlan = await plan.save();
        res.status(200).json({
            message : "Successfully updated plan",
            data : updatedPlan
        })
    } catch (error) {
        res.status(404).json({
            message : "No plan Found!" ,
            error : error
        })
    }

    
}

async function deletePlan(req , res){

    try {
        let {id} = req.params;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        res.status(200).json({
            message : "Successfully deleted plan!",
            data : deletedPlan
        })
    } catch (error) {
        res.status(404).json({
            message : "No plan Found!" ,
            error : error
        })
    }
}

module.exports.getAllPlans = getAllPlans;
module.exports.getPlanById = getPlanById;
module.exports.createPlan = createPlan;
module.exports.updatePlan = updatePlan;
module.exports.deletePlan = deletePlan;