//This is the First file - Creating a server
const express=require("express");
const app=express();

const {adminAuth}=require("../middlewares/auth");
const connectDB=require("./config/database");
const User=require("./models/user"); 

app.use(express.json());

//Note - for apply all admin routes  
//app.use("/hello",adminAuth);   
app.use("/hello/2",(req,res,next)=>{
  //res.send("hello 2");           
  next();  
},
(req,res)=>{
    res.send("this is the part - route handler");               
});

app.use("/hello",adminAuth,(req,res)=>{  
    throw new Error("ss");
    res.send("hello hello hello");       
}); 

//Error Handlers  by below way for handle each and every all error so && by usig try catch  
app.use("/",(err,req,res,next)=>{
    if(err){  
        res.status(500).send("Something went wrong");
    }
    //next(); 
});   

 

//if hit requrest like /xyz then below code still works bcz -wildcard slach so   
/* app.use("/",(req,res)=>{   
    res.send("slash routes ");      
});    */ 


connectDB()
.then(() => {
    console.log("DB connected successfully");
    app.listen(3000,() => {
        console.log("server is running on the port 3000");     
    });
})
.catch((error) => {
    console.log("DB can't connect", error);
});


 //Crud API
 app.post("/signup",async(req,res)=>{
    try{
        //Creating a new instance of userModel
        const user=new User(req.body);
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
app.patch("/updUser",async(req,res)=>{
    try {
        const userId=req.body.userId;
        const data=req.body; 
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
});

//part 2 - Advanced routing - ?,+,*,(bc)group  or regex
//Dynamic routing  - :  e.g /user/:userID and getting userID by req.params  //for get userID      


//NOTE:-order of code it is matter imp. 
//app.get("/users")  //this will only handle GET requests
//app.use("/users")  //this will match all the HTTP METHODS -GET,POST,PUT,Delete  
//revise to run above example if any confusion.   


//we shall study below points steps:-

/* Episode-03 | Creating our Express Server

Episode-04 | Routing and Request Handlers

Episode-05 | Middlewares & Error Handlers

Episode-06 | Database, Schema & Models | Mongoose

Episode-07 | Diving into the APIs

Episode-08 | Data Sanitization & Schema Validations

Episode-09 | Encrypting Passwords

Episode-10 | Authentication, JWT & Cookies

Episode-11 | Diving into the APIs and express Router

Episode-12 | Logical DB Query & Compound Indexes

Episode-13 | ref, Populate & Thought process of writing APIs

Episode-14 | Building Feed API & Pagination */