const express = require ('express');

//Creating new (instance of) application of express 
const app = express();

app.use("/user",
    //Route Handler 1
    (req,res, next)=>{
        console.log("First RH")
        res.send("First response");
        next();
        },

    (req,res)=>{
        console.log("Second RH")
        res.send("Second response");
    }
    );

//created a server on port 3000, and my app is listening on this server
    //this callback function will only work if my sever has been started successfully
app.listen(7777, ()=>{
    console.log("Successfully listening on port 7777");
});


