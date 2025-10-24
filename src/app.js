const express = require ('express');
const connectDB = require("./config/database");
//Creating new (instance of) application of express 
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json());
//Adding cookie parser middleware
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


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




