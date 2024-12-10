//This is the First Main File - Creating a server  
const express=require("express");
const app=express();

const connectDB=require("./config/database");
const cookieParser=require("cookie-parser");   

app.use(express.json());
app.use(cookieParser());    

const authRouter=require("../src/routes/auth");
const profileRouter=require("../src/routes/profile");
const requestRouter=require("../src/routes/request");  

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);  


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




//Note - for apply all admin routes  
//app.use("/hello",adminAuth);   
/* app.use("/hello/2",(req,res,next)=>{
  //res.send("hello 2");           
  next();  
},
(req,res)=>{
    res.send("this is the part - route handler");               
}); */

/* app.use("/hello",(req,res)=>{  
    res.send("hello hello hello");       
});  */ 

//Error Handlers  by below way for handle each and every all error so && by usig try catch  
/* app.use("/",(err,req,res,next)=>{
    if(err){  
        res.status(500).send("Something went wrong");
    }
    //next(); 
});    
*/


//if hit requrest like /xyz then below code still works bcz -wildcard slach so   
/* app.use("/",(req,res)=>{   
    res.send("slash routes ");      
});    */ 






 










//part 2 - Advanced routing - ?,+,*,(bc)group  or regex
//Dynamic routing  - :  e.g /user/:userID and getting userID by req.params  //for get userID      


//NOTE:-order of code it is matter imp. 
//app.get("/users")  //this will only handle GET requests
//app.use("/users")  //this will match all the HTTP METHODS -GET,POST,PUT,Delete  
//revise to run above example if any confusion.   