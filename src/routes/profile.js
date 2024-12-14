const express=require("express");
const profileRouter=express.Router();
const userAuth=require("../../middlewares/auth");
const {validateProfileEditData} = require("../utils/validation");




//PROFILE API
profileRouter.get("/profile/view",userAuth,async(req,res)=>{         
    try{
        const getUser=req.user;             
        res.status(200).json({message: "Profile information fetched successfully",users: getUser});   
    } catch (error) {
        res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    } 
});

profileRouter.post("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateProfileEditData(req)){
            throw new Error("Invalid Edit Request");
        }
        const loggedUser=req.user;  
        Object.keys(req.body).forEach(keys => {
        loggedUser[keys]=req.body[keys];  
        });
        //below you can also use .findbyidupdate() and .save() also. 
        //NOTE - Mongoose ka .save() method insert aur update dono ke liye use hota hai, depending on whether the document already exists or not.       
        const updatedUser=await loggedUser.save();         
        res.status(200).json({message: "Profile information fetched successfully",users: updatedUser});   
    } catch (error) {
        res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    } 
});  

   



module.exports=profileRouter;    