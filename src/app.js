const express = require ('express');

//Creating new (instance of) application of express 
const app = express();

//Request handler

    //this will only handle GET api calls to /user (/user, /user/xyz, /user/1...)
app.get("/user", (req,res) => {
    console.log(req.query);
    res.send("Testing req.query");
});

app.get("/user/:userId", (req,res) => {
    console.log(req.params.userId);
    res.send("Testing req.params");
});


//the ? means, the letter before it is optional
//so this will work for: /abc, /ac
app.get(/^\/ab?c$/, (req,res) => {
    res.send("Testing the ? in the route");
});


    //this will match all the HTTP method API calls to /test
app.use("/test",(req,res)=>{
    res.send("Hello from the test request");
});



//created a server on port 3000, and my app is listening on this server
    //this callback function will only work if my sever has been started successfully
app.listen(7777, ()=>{
    console.log("Successfully listening on port 7777");
});


