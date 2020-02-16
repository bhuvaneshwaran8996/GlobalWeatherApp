const Device = require("../model/device")
const jwt = require("jsonwebtoken")
const found = false;
const auth = async (req,res,next)=>{

    console.log("hei")
    
    try{
    const token = req.header("Authorization").replace("Bearer ","")
  
    const decode =  jwt.verify(token,"thevudiya")
    const device =await Device.findOne({_id:decode.id,'Tokens.token':token})

    console.log(token)

    if(!device){
        throw new Error();
    }
    req.device = device;
    req.token = token;
    next();
    }catch(e){

        res.status(401).send("Please authenticate");
    

    }
}

module.exports = auth;
