const User         = require('../models/userModel');
const asyncHandler = require("express-async-handler");

const createUserSingle = async (req, res) => {
    const email    = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        const newUser = User.create(req.body);
        res.json(newUser);
    } else {
        res.json({ message:"User Already Exists.", success:false });
    }
};

const createUser = asyncHandler(async (req, res) => {
    const email    = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("User Already Exists.");
    }
});

const loginUserCtrl = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    // Check if 'user' exists or not
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)) {
        res.json(findUser);
    } else {
        throw new Error("Invalid Credentials.");
    }
});


module.exports = { createUserSingle, createUser, loginUserCtrl };