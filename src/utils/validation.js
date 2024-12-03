const validator = require('validator');

//This is for api level validation or check  
const validationSignupData=(req)=>{
    const {firstName,lastName,emailId}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("Email ID is not valid");
    }  
}

module.exports=validationSignupData;