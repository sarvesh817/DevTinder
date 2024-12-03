const mongoose=require("mongoose");
var validator=require("validator");


//SCHEMA level Validation        

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        //for required field
        required:true,
        minLength:3
    },
    lastName:{
        type:String,
        required:true 
    },
    emailId:{
        type:String,
        //for lowercase
        lowercase:true,  
        required:true,
        unique:true, 
        //for remove white space  otherwise same email id will enter with space then it will treated as uniq email id so always use trim. 
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID"); 
            }
        }
        
    },
    password:{ 
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please Enter Strong Password");      
            }
        }  
    },
    age:{
        type:Number 
    },
    gender:{
        type:String,
        //this is custom validation way---
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender is not valid");        
            }
        }
    },
    about:{
        type:String,
        //for default value pass 
        default:"This is a default value." 
    },
    skills:{
        //you can add multiple skills now in form of Array. 
        type:[String]
    }  
}, 
{ 
    //by write below timestamps true - now mongodb will enter each document with created and updated data time bydefault automatically.   
    timestamps:true }
);        


const User=mongoose.model("User",userSchema);
module.exports=User;  
  