const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trime: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 21,
    },
    gender: {
        type: String,
        validate (value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://www.freepik.com/free-vector/blue-circle-with-white-user_145857007.htm#fromView=keyword&page=1&position=0&uuid=59254a10-5397-4127-88c3-c5910dddf5eb&query=User+profile",
    },
    about:{
        type: String,
        default: "This is the about section of your profile",
    },
    skills:{
        type: [String],
    }
}
,
{
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;