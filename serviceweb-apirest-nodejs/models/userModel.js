const mongoose = require("mongoose");
const bcrypt   = require('bcrypt');

var userSchema = new mongoose.Schema({
    firstname: {
            type:String,
        required:true,
    },
    lastname: {
            type:String,
        required:true,
    },
    email: {
            type:String,
        required:true,
          unique:true,
    },
    mobile: {
            type:String,
        required:true,
          unique:true,
    },
    password: {
            type:String,
        required:true,        
    },
    role: {
           type:String,
        default:"user"
    },
    isBlocked: {
           type:Boolean,
        default:false,
    },
    cart: {
           type:Array,
        default:[],
    },
    address: [{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Address"
    }],
    wishList:[{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Product"
    }]
}, {
    timestamps:true
});

/**
 * It's for create 'user' encrypt 'password'
 */
userSchema.pre('save', async function(next) {
    const salt    = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * It's for login, compare password
 */
userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);