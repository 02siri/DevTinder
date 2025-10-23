const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next)=>{
    try{
        //Read the token from request cookies
    const cookies = req.cookies;
    const {token} = cookies;
    
    if(!token){
         throw new Error("Invalid Token");
    }

    //Validate the token 
    const decodedData = await jwt.verify(token, "DEV@Tinder#790$");
    
    //Find the user
    const {_id} = decodedData;
    const user = await User.findById(_id);

    if(!user){
        throw new Error("User not found!");
    }

    //If user found, attach my user to the request
    req.user = user;

    //Call the next request handler
    next();


    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
};

module.exports = {
    userAuth,
}