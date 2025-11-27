const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName";

//Get all the 'pending' connection requests for the logged in user
userRouter.get("/user/requests/received",userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", USER_SAFE_DATA);

        //Finding name of these connection requests 

        //Way 1: Looping over each request and then find name -> Poor way of handling 

        //Way 2: Building relation bw two tables -> ConnectionRequest & User


        res.json({message: "Data Sent Successfully",
            data: connectionRequests,
        })

    }catch(err){
        req.statusCode(400).send("ERROR: " + err.message);
        
    }

});

userRouter.get("/user/connections", userAuth,async(req,res)=>{
    try{
    const loggedInUser = req.user;
    const connections = await ConnectionRequest.find({
        $or: [
        {toUserId : loggedInUser._id, status:"accepted"},
        {fromUserId : loggedInUser._id, status: "accepted"},
        ],
    }).populate("fromUserId",USER_SAFE_DATA)
    . populate("toUserId", USER_SAFE_DATA);

    console.log(connections);

    const data = connections.map(row => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
           return row.toUserId;
        }
        return row.fromUserId;
    });

    res.json({ data })
    }catch(err){
        res.status(400).json({
            message:"ERROR " + err.message
        })
    }
    
    
});

userRouter.get("/feed", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;

        //User can see all user cards, except:
        //0. his own card
        //1. connections (status: 'accepted')
        //2. ignored someone (status: 'ignored')
        //3. already sent connection requests to (status: 'interested')
        //4. someone rejected his request (status: 'rejected')
    

    }catch(err){
        res.status(400).json({message: "ERROR: " + err.message});
    }
});

module.exports = userRouter;