//This is the First file - Creating a server
const express=require("express");
const app=express();

app.post("/",(req,res)=>{
    res.send("request from server");      
});

app.post("/test",(req,res)=>{
    res.send("request from test server");   
});

app.listen(3000,() => {
    console.log("server is running on the port 3000");     
});
