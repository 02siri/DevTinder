const express = require ('express');

//Creating new (instance of) application of express 
const app = express();

app.get("/getUserData", (req,res)=>{
    throw new Error("bjke");
    res.send("User Data sent")
    
})

app.use("/",(err,req,res,next)  => {
    
    if(err){
        res.status(500).send("Something went wrong");
    }
})

//created a server on port 3000, and my app is listening on this server
    //this callback function will only work if my sever has been started successfully
app.listen(7777, ()=>{
    console.log("Successfully listening on port 7777");
});


