const mongoose = require("mongoose");

const blogCategorySchema = new mongoose.Schema({
    title: {
            type:String,
        required:true,
    },
    description: {
            type:String,
        required:true,
    },
    image: {
           type:String,
        default:"https://www.shutterstock.com/image-photo/bloggingblog-concepts-ideas-white-worktable-600w-1029506242.jpg",
    },
    author: {
           type:String,
        default:"Admin",
    }
}, {
    
    timestamps:true,
});

module.exports = mongoose.model("BlogCategory", blogCategorySchema);