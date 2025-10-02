const express = require ('express');

//Creating new (instance of) application of express 
const app = express();

//Request handler

    //this will only handle GET api calls to /user
app.get("/user", (req,res) => {
    res.send({
        firstName: "Srishti",
        lastName: "Khosla"
    });
});

app.post("/user", (req,res)=>{
    //saving data to DB
    console.log("Save data to DB");
    res.send("Data successfully saved to the database");
});

app.delete("/user", (req,res) => {
    res.send("User successfully deleted from the database");
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


