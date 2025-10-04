const adminAuth = (req,res,next)=>{
    const token = "abc";

    const isAdminAuth = token === "xyz";

    if(!isAdminAuth){
        res.status(401).send("Admin is not authenticated");
    }
    next();
};

const userAuth = (req,res,next)=>{
    const token = "U1234";

   const isUserAuth = /^[A-Z]\d{4}$/.test(token);

   if(!isUserAuth){
    res.status(401).send("User is not authenticated");
   }
   next();
};

module.exports = {
    adminAuth,
    userAuth,
}