const express=require("express");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter=express.Router();        
const userAuth=require("../../middlewares/auth"); 
const User=require("../models/user");

userRouter.post("/user/request/received",userAuth,async(req,res)=>{ 
    try{
        const data=await ConnectionRequest.find({
            toUserId:req.user._id,
            status:"Interested"
        })//here populate date and just like join in mysql show below field information.       
        .populate('fromUserId','firstName lastName age gender about skills'); 

        if(!data){
            res.send(400).json({message:"Requests doesn't exist"});
        }  
        return res.status(200).json({message: "All Requests received successfully",data});       
    } catch (error) {
        return res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    }
}); 

//Feed API 
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{    
        const loggedUser=req.user;
        //Pagination here 
        const page=req.query.page || 1;
        let limit=req.query.limit || 10;
        limit = limit >50 ? 50 : limit;
        const skip=(page-1)*limit;

        const connectionRequests=await ConnectionRequest.find({
            $or:[{fromUserId:loggedUser._id},{toUserId:loggedUser._id}]  
        })//this is the way for select some selected fields 
        .select("fromUserId toUserId");  

        const hideUsersFromFeed=new Set();
        connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());     
        });
        const users=await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUsersFromFeed)}},
                {_id:{$ne: loggedUser._id}}
            ]
        }).select("firstName lastName age gender skills").skip(skip).limit(limit);    
         if(!users){   
          return  res.status(404).json({message:"No available feed data"});                
        }
        return res.status(200).json({message:"All Feed data fetched successfully",users});            

    }catch(error){
        return res.status(500).json({message:error.message});
    }

});
module.exports=userRouter;      