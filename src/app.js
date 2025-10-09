const express = require ('express');
const connectDB = require("./config/database");
//Creating new (instance of) application of express 
const app = express();
const User = require("./models/user");

//api for sign up user
app.post("/signup", async (req,res)=>{
    const userObj = {
        firstName: "Akshay",
        lastName: "Saini",
        emailId: "akshay123@gmail.com",
        password: "akshay123",
        age: 21,
        gender: "male"
    };

//Creating a new instance of the User model by passing the data (userObj)
const user = new User(userObj);
//Because this is instance of User model and we call .save(), 
// the data will be saved to the Db
// This save() function will return a promise and so use async-await
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




