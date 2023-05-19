const { generateToken } = require('../configs/jwtToken');
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
    if(findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
                  _id:findUser?._id,
            firstname:findUser?.firstname,
             lastname:findUser?.lastname,
                email:findUser?.email,
               mobile:findUser?.mobile,
                token:generateToken(findUser?._id)
        });
    } else {
        throw new Error("Invalid Credentials.");
    }
});

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createUserSingle, createUser, loginUserCtrl, getUsers, getUser };