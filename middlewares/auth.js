//below is middleware example      

const adminAuth=(req,res,next) => {
    console.log("Admin auth is getting checked");
    const token="xyz";
    if(token==="xyz"){
       next(); 
    }else{
        res.status(401).send("UN-Authorised Request");    
    }
}

module.exports={adminAuth};