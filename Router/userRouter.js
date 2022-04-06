const express = require("express");
const { signup, login, protectRoute, forgetPassword, resetPassword } = require("../Controller/authController");

const userRouter = express.Router();

const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req , file , cb){
    cb(null , "public/images/users")
  } ,
  filename : function(req , file , cb){
    cb(null , `user${Date.now()}.jpg`);
  } 
})

function fileFilter(req , file , cb){
  if(file.mimetype.includes("image")){
    cb(null , true);
  }
  else{
    cb(null , false);
  }
}

const upload = multer({storage:storage , fileFilter:fileFilter});

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    updateProfilePic
} = require("../Controller/userController")

// userRouter.route("")
// .get(getAllUsers)
// .post(createUser)

userRouter.post("/signup" , signup);
userRouter.post("/login" , login);
userRouter.post("/forgetpassword" , forgetPassword);
userRouter.patch("/resetpassword/:token", resetPassword);

userRouter.use(protectRoute);

userRouter.route("")
.get(getUserById)
.patch(updateUser)
.delete(deleteUser);


userRouter.patch("/updateprofilepic", upload.single("user") , updateProfilePic)

module.exports = userRouter;