const cron = require("node-cron");
const ConnectionRequestModel = require("../models/connectionRequest");
const {subDays, startOfDay, endOfDay} = require("date-fns"); 
const sendEmail = require("./sendEmail");

cron.schedule("54 12 * * *", async ()=>{
    //Send Emails to all people who got requests the previous day

    try{

    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            },
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.emailId))];

        console.log(listOfEmails);
        for(const email of listOfEmails){
           try{
            const emailRes = await sendEmail.run(
              "New friend requests pending for " + email,
              "You have friend requests pending!",
              email
            );
            console.log(emailRes);
           }catch(err){
            console.error(err);
           } 
        }
        
    }catch(err){
        console.error(err);
    }
});