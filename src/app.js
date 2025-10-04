const express = require ('express');

//Creating new (instance of) application of express 
const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

//middlewares

//admin middleware
app.use("/admin", adminAuth);

app.use("/admin/getAllData", (req,res)=>{
    res.send("Sent all data to Admin");
});

app.use("/admin/deleteAllData", (req,res)=>{
    res.send("Delete all data");
});

//user middleware
app.get("/user/login", (req,res)=>{
    res.send("User logged in successfully");
})

app.get("/user", userAuth, (req,res)=>{
    res.send("User can perform actions");
})


//created a server on port 3000, and my app is listening on this server
    //this callback function will only work if my sever has been started successfully
app.listen(7777, ()=>{
    console.log("Successfully listening on port 7777");
});


