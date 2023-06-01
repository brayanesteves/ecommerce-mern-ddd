const Blog                 = require("../models/blogModel");
const User                 = require("../models/userModel");
const asyncHandler         = require("express-async-handler");
const { validateMongDbId } = require('../utils/validateMongodbId');

const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
             status:"success",
            message:"Blog add successfully",
            newBlog,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new:true, });
        res.json({
               status:"success",
              message:"Blog update successfully",
            updateBlog,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getBlog     = await Blog.findById(id);
        const updateViews = await Blog.findByIdAndUpdate(id, {
            $inc:{ numViews:1 }
        }, 
        { new:true }
        );
        res.json({
             status:"success",
            message:"Blog find successfully",
            getBlog,
            updateViews,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getBlogs = await Blog.find();
        res.json({
             status:"success",
            message:"Blog finds successfully",
            getBlogs,
              total:getBlogs.length,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json({
            status:"success",
           message:"Blog delete successfully",
           deleteBlog,
     });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog };