const User = require("../models/User-Model.js");
const bcryptjs = require("bcryptjs");
const auth = require("../auth.js");

module.exports.registerUser = (req, res) => {
    // Log the incoming request body for debugging
    console.log('Received request body:', req.body);

    // Destructure the necessary fields from req.body
    const { firstName, middleName, lastName, email, contactNumber, password } = req.body;

    // Validate that all required fields are present
    if (!firstName || !lastName || !email || !contactNumber || !password) {
        return res.status(400).send({
            code: "REGISTRATION FAILED",
            message: "All fields (firstName, lastName, email, contactNumber, password) are required!"
        });
    }

    // Check if password is provided
    if (!password) {
        return res.status(400).send({
            code: "REGISTRATION FAILED",
            message: "Password is required!"
        });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user object
    const newUser = new User({
        firstName,
        middleName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword
    });

    // Save the new user to the database
    return newUser.save()
    .then(result => {
        // Send success response
        res.send({
            code: "REGISTRATION SUCCESS",
            message: "You are now registered!",
            result: result
        });
    })
    .catch(error => {
        console.error(error);  // Log the error for debugging
        res.status(500).send({
            code: "REGISTRATION FAILED",
            message: "We encountered an error during registration. Please try again!",
            result: error
        });
    });
};

//User Login 
//Destructuring 
module.exports.loginUser = (req,res) =>{
    let {email, password} = req.body;
    return User.findOne({email: email}).then(result =>{
    if(result == null)  {
        res.send({
            code: "LOGIN ERROR",
            message: "Email is not registered. Please Register first!"
        })
    }else{
        const isPasswordCorrect = bcryptjs.compareSync(password, result.password);
        if(isPasswordCorrect){
            res.send({
                code: "LOGIN SUCCESS",
                token: auth.createAccessToken(result),
                message: "You are now logged in"
            })
        }else{
            res.send({
                code: "LOGIN ERROR",
                message: "Password is incorrect. Please try again!"
            })
        }
    }
    })
}

//check email if existing

module.exports.checkEmail = (req,res) =>{
    let {email} = req.body;
    return User.find({email: email}).then(result =>{
        if(result.length > 0){
            res.send({
                code: "EMAIL EXIST",
                message: "Email is registered"
            })
        }else{
            res.send({
                code: "EMAIL NOT TAKEN",
                message: "Email is not registered"
    })
    }
    })
}