//This is the First file - Creating a server
const express=require("express");
const app=express();


app.use("/hello/2",(req,res)=>{
    res.send("hello 2 2");         
});

app.use("/hello",(req,res)=>{
    res.send("hello hello hello");      
});

app.use("/test",(req,res)=>{      
    res.send("test routes ");      
}); 

//if hit requrest like /xyz then below code still works bcz -wildcard slach so   
app.use("/",(req,res)=>{   
    res.send("slash routes ");      
});    

app.listen(3000,() => {
    console.log("server is running on the port 3000");     
});


//NOTE:-order of code it is matter imp. 
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