const express = require ('express');
const connectDB = require("./config/database");
//Creating new (instance of) application of express 
const app = express();
const User = require("./models/user");

//Middleware will be activated for ALL the routes/every request that runs on our server
    //reads JSON object -> converts into JS object -> puts this into the req body -> req body returns this JS obj
app.use(express.json());

//api for sign up user
app.post("/signup", async (req,res)=>{


    const user = new User(req.body);

    try{
    await user.save();
    res.send("User created successfully");
    }catch(err){
        res.status(400).send("Error saving the user " + err.message);
    }
});


connectDB().then(()=>{
    console.log("Database connection established...");

    //created a server on port 7777, and my app is listening on this server
    //this callback function will only work if my sever has been started successfully
app.listen(7777, ()=>{
    console.log("Successfully listening on port 7777");
});

}).catch((err)=>{
    console.log("Database cannot be connected!");
});




