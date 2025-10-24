const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authRouter = express.Router();
    //Same as:
        //const app = express();
        //app.use("")..
        //router.use("")..
        
//Now we will do authRouter.get, authRouter.post...

authRouter.post("/signup", async (req,res)=>{
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

authRouter.post("/login", async(req,res)=>{
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
});

module.exports = authRouter;

