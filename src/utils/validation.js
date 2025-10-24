const validator = require("validator");

const validateSignUpData = (req) => {
    //take out the fields from req.body
    const{firstName, lastName, emailId, password} = req.body;

    if(!firstName||!lastName) {
        throw new Error("Name is not valid");
    }

    //These checks are also on the Database length
    else if(firstName.length<4 || firstName.length>50){
        throw new Error("First name should be 4 to 50 characters");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("EmailId is not valid");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
};

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", 
            "age", "gender", "photoURL", "about", "skills"];
    
    const isEditAllowed = Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    
    return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateProfileEditData,
};

