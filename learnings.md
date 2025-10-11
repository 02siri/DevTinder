
# Episode 3: Creating Our Express Server

    - Create a repo
    - Initialize the repository (npm init)
    - node_modules, package.json, package-lock.json : saw the details and difference
    - Install express (npm install express)
    - Create a server (src/app.js)
    - Listen to port 7777
    - Write request handlers for /test, /hello
    - Install nodemon and update scripts inside package.json
    - What are dependencies 
    - What is the use of "-g" while npm install
    - Difference between tilda (~) and carat (^)
    - Why package-lock.json has been pushed to github

# Episode 4:
    - order of routes, and their extensions matter (eg, "/hello", "/hello/2",..)
    - Installed Postman app
        - make workspace -> collection -> test GET api call
    - Logic to handle GET, POST, PATCH, PUT, DELETE api calls & testing on Postman
    - Explore different kinds of routing
        - Use of ?, +, *, (), regex in the routes
        - Reading query parameters in the routes (req.query)
        - Reading dynamic routes (req.params)

# Episode 5: 
    - Handling multiple Route Handlers (RHs)
    - next()
    - next function and errors along with res.send();
    - app.use ("/route", rH1, [rH2, rH3], rH4, rH5 ) -> Array of RHs
    - What is a middleware; Why do we need it? 
    - How Express.js handles requests behind-the-scenes
    - Difference bw app.use() and app.all() [very small difference bw route handling]
    - Dummy auth middleware for admin
    - Dummy auth middleware for all user routes, except /user, /login
    - Error handling using app.use("/route", (err,req,res,next)=> {});
    - Error handling using try-catch

# Before Ep 6 (S1, Ep 13):
    - MongoDB Website 
    - Create free M0 cluster (on MongoDB Atlas)
    - Create a User 
    - Get the connection string
    - Use MongoDB Compass
# Episode 6: 
    - Install mongoose library
    - Connect your application to the database (not cluster) : "ConnectionURL"/devTinder
    - call the connectDB function and connect to database before starting application on 7777.
    - Create a userSchema, and User model 
    - Create /signup API to add data to database
    - Push some documents using API calls from postman
    - Error handling using try-catch

# Episode 7:
    - Diff bw JavaScript object and JSON object 
        //JSON always takes key-values pairs as string, but JS doesn't take the keys as string
    - Add express.json() middleware to the app
    - Make signup API dynamic, to receive data from the end user (can be browser, postman, etc.)
    - User.findOne() with duplicate email Ids, which document will be returned : 
    - API: Get user by email: find(), findOne()
    - API: Feed api - GET /feed - get all users from the database : find()
    - API: Get user by Id : findById()
    - API: Delete user by Id : findByIdAndDelete(userId) or findOneAndDelete({_id: userID})
    - API: Update user by Id : findByIdAndUpdate(userId, data, options)
        - Explore options parameter in findByIdAndUpdate or findOneAndUpdate
    - Explore Mongoose documentation for Models