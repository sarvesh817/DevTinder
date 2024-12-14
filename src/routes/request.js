const express=require("express");
const requestRouter=express.Router();
const User=require("../models/user");
const userAuth=require("../../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{  
    try {
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;  
        const status=req.params.status;

        //1 - Validation only enter below 2 status types. 
        const allowedStatus=["ignored","Interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({ message: "Invalid status type"});
   
        }
        
        //2 -to userId exist or not 
        const toUserexist=await User.findById(toUserId);       
        if(!toUserexist){       
            return res.status(401).json({message: "User not found"});        
        }

        // 3 - Check connection has already sent or not.
        const exitConnection = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: fromUserId, toUserId: toUserId },  // fromUserId to toUserId
                { fromUserId: toUserId, toUserId: fromUserId }   // reverse check
            ]
        });
       
        if(exitConnection){
            return res.status(400).json({message: "Connection Request Already Exist!!!"});       
        }

        const conReqData=new ConnectionRequest({
            fromUserId,toUserId,status
        });     
        const data=await conReqData.save();
        return res.status(200).json({message: "Connection Requested successfully",data});    
    } catch (error) {
        return res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    }

});     

//Connection Review API
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{   
    try{
        const loggedUser=req.user;   
        const {status,requestId}=req.params;
        const allowedStatus=["Accepted","Rejected"]; 
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"Status not allowed"});      
        }
        const connectionRequest=await ConnectionRequest.findOne({
             _id:requestId,  
             toUserId:loggedUser._id,
             status:"Interested"
        });
        if(!connectionRequest){
            return res.status(404).json({message: "Connection request no found"});   
            
        }
        connectionRequest.status=status;
        const data=await connectionRequest.save();
        return res.status(200).json({message: "Connection Request "+status,data});     
    } catch (error) {
        return res.status(500).json({message: "Error occurred while fetching users",error: error.message});
    } 
});
  
module.exports=requestRouter;       







