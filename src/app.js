const express = require ('express');
const connectDB = require("./config/database");
//Creating new (instance of) application of express 
const app = express();
const User = require("./models/user");


app.use(express.json());

//api for signup user
app.post("/signup", async (req,res)=>{
    
    const user = new User(req.body);

    try{
        await user.save();
        res.send("User created successfully")
    }catch(err){
        res.status(400).send("Problem in creating user");
    }


});

//finding user by email (feed api)
app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;

    try{
    // //this takes in a JS object
    //     const users = await User.find({emailId: userEmail});

    //     if(users.length===0){
    //         res.status(404).send("No user found with email: " + userEmail);
    //     }else{
    //         //this will return the array of objects with that email id
    //     res.send(users);
    //     }

    //find & findOne -> 
        //find returns all the results with that parameter
        //findOne returns only one result from all the documents
            //returns the first document that satisfies the query
                //It does not guarantee which specific "first" document it returns unless you 
                // explicitly define a sort order. 
                // Without a sort order, the "first" document is determined by 
                // the natural order of documents in the collection, 
                // which can be influenced by factors like the insertion order 
                // or the underlying storage engine, and may not be consistently the same 
                // across different queries or MongoDB instances.
    const user = await User.findOne({emailId: userEmail});
    res.send(user);

       
    }catch(err){
        res.status(400).send("Something went wrong")
    }
    
}); 

//getting all users (feed api)
app.get("/feed", async (req,res)=>{
    
    try{   

                        //empty bracket means -> fetching all the documents
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong")
    }
}); 

//Delete user by ID 
app.delete("/user", async(req,res) =>{
    const userID = req.body.userID;
    try{
        const user = await User.findByIdAndDelete(userID);
                            //or User.findOneAndDelete({_id: userID})
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Something went wrong")
    }

})

// //Update user using ID
// app.patch("/user", async(req,res)=>{
//     //Any other data sent in the request, which is not part of the schema, will be ignored by mongoDB
//     const userID = req.body.userID;
//     const data = req.body;

//     try{    
//                                                             //return the doc before update ; by default-> before 
//         const user = await User.findByIdAndUpdate(userID, data, {returnDocument: "after"});
//         console.log(user);
//         res.send("User updated successfully");
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// });

//Update user using emailId
app.patch("/user", async(req,res)=>{
    const emailId = req.body.emailId;
    const data = req.body;

    try{
        const user = await User.findOneAndUpdate({emailId: emailId}, data);
        res.send("User updated by EmailId");
    }catch(err){
        res.status(400).send("Something went wrong");
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




