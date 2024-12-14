//below is middleware example      
const jwt=require("jsonwebtoken");
const User=require("../src/models/user");  

//TOKEN AUTH 
const userAuth=async(req,res,next)=>{   
    try{
        //Read the token from the req cookies
        //validate the token
        //Find the userName 

        const {token}=req.cookies;
        if(!token){
            throw new Error("Token is not Valid!!!!!");
        }
        const decodeMsg=jwt.verify(token,"thisissamplecode");
        const {_id}=decodeMsg;
        const userData=await User.findById(_id);     
        if(!userData){
            throw new Error("User doesn't Exists...");
        }
        req.user=userData;  
        next();  

    }catch(error){
        res.status(400).send("Error : "+error.message);  
    }

}

module.exports= userAuth;  