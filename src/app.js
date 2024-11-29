//This is the First file - Creating a server
const express=require("express");
const app=express();

const {adminAuth}=require("../middlewares/auth");



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

//Error Handlers  by below way && by usig try catch  
app.use("/",(err,req,res,next)=>{
    if(err){  
        res.status(500).send("Something went wrong");
    }
    //next(); 
});   

 

//if hit requrest like /xyz then below code still works bcz -wildcard slach so   
app.use("/",(req,res)=>{   
    res.send("slash routes ");      
});    




app.listen(3000,() => {
    console.log("server is running on the port 3000");     
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