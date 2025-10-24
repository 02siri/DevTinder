const express = require("express");
const {userAuth} = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res)=>{
   try{
     //Sending a connection Request
    res.send("Connection Request Sent by "+ req.user.firstName);
   }catch(err){
    res.status(400).send("ERROR: " + err.message);
   }
    
});

module.exports = requestRouter;