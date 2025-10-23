const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trime: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value);
            }
        }
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

//Not Arrow function; it will break
    //because 'this' keyword will not work in arrow function
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@Tinder#790$", {expiresIn: "1d"});

    return token;
};
 
userSchema.methods.validatePswd = async function(passwordInputByUser){
   const user = this;
   const passwordHash = user.password;

    const isPswdValid = bcrypt.compare(passwordInputByUser, passwordHash);
    return isPswdValid;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;