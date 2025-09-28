const express = require ('express');

//Creating new (instance of) application of express 
const app = express();

//Request handler

app.use("/",(req,res)=>{
    res.send("Hello from the home page");
})

app.use("/hello",(req,res)=>{
    res.send("Hello from the hello request");
})

app.use("/test",(req,res)=>{
    res.send("Hello from the test request");
})

//created a server on port 3000, and my app is listening on this server
    //this callback function will only work if my sever has been started successfully
app.listen(7777, ()=>{
    console.log("Successfully listening on port 7777");
});


