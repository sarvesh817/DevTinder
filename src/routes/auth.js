const express=require("express");
const authRouter=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt"); 
const jwt=require("jsonwebtoken");    
const {userAuth}=require("../../middlewares/auth");
const {validationSignupData}=require("../utils/validation");
const validator = require('validator');  

 //Crud API
authRouter.post("/signup",async(req,res)=>{
    try{
        //Validation of the data
        validationSignupData(req);                

        //Password Encrypted
        const {firstName,lastName,emailId,password}=req.body;  
        const passwordHash=await bcrypt.hash(password,10);   
        const data={ firstName,lastName,emailId,password: passwordHash };     

        //Creating a new instance of userModel    
        const user=new User(data);     
        const userData=await user.save();
        if(userData){   
            res.status(200).json({message:"UserData Insertion Successfully ",userData});   
        }else{
            res.status(400).json({message:"userData insertion Failed"});   
        }
        
    }catch(error){
        res.status(400).send("Error - "+error.message);    

    }
 });


authRouter.post("/login", async (req, res) => { 
    try {
        const { emailId, password } = req.body;

        // Check if emailId and password are provided
        if (!emailId || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by emailId
        const existingUser = await User.findOne({ emailId });
        if (!existingUser) {
            return res.status(401).json({success: false, message: "Invalid credentials" });   
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password); 
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token=await jwt.sign({_id:existingUser._id},"thisissamplecode",{expiresIn:"1d"});    


        res.cookie('token',token);               

        // Login successful
        res.status(200).json({ success: true,  message: "Login successfully",data: {
            userId: existingUser._id,
            emailId: existingUser.emailId
        } });
    } catch (error) {
        res.status(500).json({success: false, message: "Login Failed", error: error.message });
    }
});  

authRouter.post("/logout",async(req,res)=>{
    res.cookie('token',null,{expires:new Date(Date.now())});  
    res.send("Logout Successfully!!!!!");     
});  

//FORGET PASSWORD API
authRouter.post("/forgetPassword", userAuth, async(req, res) => {   
    try {
        const { email, currentPassword, updatePassword } = req.body;             
        const existUser = await User.findOne({email});  

        //1 - Check if the user exists
        if (!existUser) {
            return res.status(404).json({ success: false, message: "User doesn't exist..." });
        } 
        console.log('Current Password:', currentPassword); // Log the incoming password
        console.log('Stored Password:', existUser.password); // Log the stored hashed password


        //2 - Verify the current password
        const ispassValid = await bcrypt.compare(currentPassword, existUser.password);
        if (!ispassValid) {
            return res.status(401).json({ success: false, message: "Invalid Current Password..." });
        }

        //3 - Make strong password first then do hash 
        if(!validator.isStrongPassword(updatePassword)){
            return res.status(400).json({ success: false, message: "Please enter a strong password" });  
        }

        const hashedPass=await bcrypt.hash(updatePassword,10);    
        //4 - Now update the password
        const updatedData = {
            password: hashedPass
        };
        const resUpdData = await User.findByIdAndUpdate(existUser._id, updatedData, {
            new:true,
        });

        if (resUpdData) {
            return res.status(200).json({ success: true, message: "Password Updated Successfully..." });
        } else {
            return res.status(500).json({ success: false, message: "Password Updation Failed..." });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    } 
});




/*
// Fetch User Records
app.get("/getUser", async (req, res) => {
    try {
        const getUser = await User.find();
        res.status(200).json({message: "Users information fetched successfully",users: getUser});
    } catch (error) {
        res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    }
});


 //Update User Record
app.patch("/updUser/:userId",async(req,res)=>{
    try {
        //params write bcz by query sting id is getting so  
        const userId=req.params.userId; 
        const data=req.body; 

        //API LEVEL VALIDATION
        const allowd_updates=["skills","about","gender","age"];
        const isUpdateAllowed=Object.keys(data).every((k)=>
            allowd_updates.includes(k)
        );
        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed");    
        }

        if (data.skills && data.skills.length > 10) { 
            throw new Error("Skills can't be more than 10"); 
        }
        const updUser=await User.findByIdAndUpdate({_id:userId},data,{
              returnDocument:"after",
              runValidators:true,  
        });         
        if(updUser)
            res.status(200).json({message: "Users Updated successfully",users: updUser});
        else
            res.status(500).json({message: "Users Updation Failed",users: updUser});       
    } catch (error) {
        res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    }
});

//Delete User Record  
app.delete("/delUser",async(req,res)=>{
    try {
        const userId=req.body.userId;
        const delUser=await User.findByIdAndDelete(userId);    
        if(delUser)
            res.status(200).json({message: "Users Deleted successfully",users: delUser});
        else
            res.status(500).json({message: "Users Deletion Failed",users: delUser});    
    } catch (error) {
        res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    }
}); */


 module.exports=authRouter;  
