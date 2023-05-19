const { generateToken }       = require('../configs/jwtToken');
const User                    = require('../models/userModel');
const asyncHandler            = require("express-async-handler");
const { validateMongDbId }    = require('../utils/validateMongodbId');
const { generateRefeshToken } = require('../configs/refreshToken');
const jwt                     = require("jsonwebtoken");

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
        const refreshToken = await generateRefeshToken(findUser?._id);
        const updateuser   = await User.findByIdAndUpdate(findUser.id,  {
            refreshToken:refreshToken,
        }, {
            new:true
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
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

// Handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if(!cookie?.refreshToken) {
        throw new Error('No Refresh Token in Cookies.');
    }
    const refreshToken = cookie.refreshToken;
    const user         = await User.findOne({ refreshToken });
    if(!user) {
        throw new Error('No Refresh Token present in "DB" or not matched.');
    }
    jwt.verify(refreshToken, "brayanesteveshalconbit", (err, decoded) => {
        if(err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token.');
        }
        const accessToken = generateToken(user?._id);
        res.json({ accessToken });
    });

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

// Update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongDbId(_id);
    const { firstname, lastname, email, mobile } = req.body;
    try {
        const user = await User.findByIdAndUpdate(_id, {
            firstname:firstname, 
             lastname:lastname, 
                email:email, 
               mobile:mobile,
        },
        {
            new:true,
        });
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findById(id);
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

// Get a single user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findByIdAndDelete(id);
        res.json({
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked:true,
        },
        {
            new:true,
        });
        res.json({
            meesage:`User ${user.firstname}. ${user.lastname} - Blocked`,
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked:false,
        },
        {
            new:true,
        });
        res.json({
            meesage:`User ${user.firstname}. ${user.lastname} - Unblocked`,
            user,
        });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createUserSingle, createUser, loginUserCtrl, getUsers, getUser, updatedUser, deleteUser, blockUser, unblockUser, handleRefreshToken };