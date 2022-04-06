// const { v4: uuidv4 } = require('uuid');
// const fs = require("fs");
// let path = require("path");
// let usersPath = path.join(__dirname , ".." , "Model" , "usersModel.json");

const userModel = require("../Model/usersModel");

async function createUser(req , res){
    try {
        let newUserObj = req.body;
        let user = await userModel.create(newUserObj);
        res.status(200).json({
            message : "Successfully created user!",
            data : user
        })
    } catch (error) {
        res.status(501).json({
            message : "Could not create user!",
            error
        })
    }
}


async function getAllUsers(req , res){
    try {
        let allUsers = await userModel.find({})
        res.status(200).json({
            message : "Successfully recieved all users!",
            data : allUsers
        })
    } catch (error) {
        res.status(404).json({
            message : "No user found!",
            error
        })
    }
}

async function getUserById(req , res){
    try {
        let id = req.id;
        let user = await userModel.findById(id);
        res.status(200).json({
            message : "Successfully recieved user by Id !",
            data : user
        })
    } catch (error) {
        res.status(404).json({
            message : "Could not find user!",
            error
        })
    }
    
}


async function updateUser(req , res){
    try {
        let id = req.id ;
        let {userObj} = req.body;
        let updatedUser = await userModel.findByIdAndUpdate(id , userObj , {new : true});
        res.status(200).json({
            message : "Successfully updated user!",
            data : updatedUser
        })
    } catch (error) {
        res.status(404).json({
            message : "Could not update user!",
            error
        })
    }

}

async function deleteUser( req , res){
    try {
        let id = req.id;
        let deletedUser = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            message : "Successfully deleted user!",
            data : deletedUser
        })
    } catch (error) {
        res.status(404).json({
            message : "Could not delete user!",
            error
        })
    }
}

async function updateProfilePic(req , res){
    try {
        let file = req.file;
        //console.log(file);
        let imagePath = file.destination + "/" + file.filename;
        imagePath = imagePath.substring(6);
        let id = req.id;
        let user = await userModel.findById(id);
        user.pImage = imagePath;
        await user.save();
        res.status(200).json({
            message : "Profile pic updated"
        })
    } catch (error) {
        res.status(501).json({
            error
        })
    }
}

module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.updateProfilePic = updateProfilePic;