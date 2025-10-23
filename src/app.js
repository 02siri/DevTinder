const express = require ('express');
const connectDB = require("./config/database");
//Creating new (instance of) application of express 
const app = express();
const User = require("./models/user");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth.js");

const {validateSignUpData} = require("./utils/validation.js");
const bcrypt = require("bcrypt");


app.use(express.json());
//Adding cookie parser middleware
app.use(cookieParser());

//api for signup user
app.post("/signup", async (req,res)=>{
    try{
    //1. Validation of data
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;

    //2. Encrypt the password
        //arguments: plainPswd, no. of saltRounds,
            //saltRounds : the more the number of salt rounds will be, the more encryption level, and tougher to break the pswd 
            //salt - random string fuiibwviebvb!@@#4

    const passwordHash = await bcrypt.hash(password, 10); //returns a promise
    console.log(passwordHash);
    
    //Creating new instance of User model
    const user = new User({
        firstName, 
        lastName, 
        emailId, 
        password: passwordHash,
    });
        //3. Store user into DB
        await user.save();
        res.send("User created successfully")
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }


});

app.post("/login", async(req,res)=>{
    try{
        const {emailId, password} = req.body;

        if(!validator.isEmail((emailId))){
            throw new Error("Email Id not valid");
        }
        
        //Comparing Email and Pswd from DB  

            //1. find user in the DB
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

            //2. if user found, compare the pswd
            //bcrypt.compare returns boolean
        const isPswdValid = await user.validatePswd(password);

        if(isPswdValid){

            //1. Token being created in user schema for every user, so just get that token
            const token = await user.getJWT();
                    
            //2. Add token to Cookie + 3. Send response back to user 
            res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 30000)
            });
            

        //Job of browser is to read the cookies, and keep it safely
        //Whenever Im making any other API call, please send back the cookie

            res.send("Login Successful");
        }else{
            throw new Error("Invalid credentials");
        }

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

app.get("/profile", userAuth, async(req,res)=>{

    try{
         
   res.send(req.user.firstName);
   
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
   
});

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{
   try{
     //Sending a connection Request
    res.send("Connection Request Sent by "+ req.user.firstName);
   }catch(err){
    res.status(400).send("ERROR: " + err.message);
   }
    
})

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




