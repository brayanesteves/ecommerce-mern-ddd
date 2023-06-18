const BlogCategory         = require("../models/blogCatModel");
const User                 = require("../models/userModel");
const asyncHandler         = require("express-async-handler");
const { validateMongDbId } = require('../utils/validateMongodbId');

const createBlogCategory = asyncHandler(async (req, res) => {
    try {
        const newBlogCategory = await BlogCategory.create(req.body);
        res.json({
             status:"success",
            message:"Blog Category add successfully",
            newBlogCategory,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const updateBlogCategory = await BlogCategory.findByIdAndUpdate(id, req.body, { new:true, });
        res.json({
               status:"success",
              message:"Blog Category update successfully",
            updateBlogCategory,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const getBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const getBlogCategory = await BlogCategory.findById(id);
        res.json({
             status:"success",
            message:"Blog Category find successfully",
            getBlogCategory,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const getAllBlogCategorys = asyncHandler(async (req, res) => {
    try {
        const getBlogCategorys = await BlogCategory.find();
        res.json({
             status:"success",
            message:"Blog Category finds successfully",
            getBlogCategorys,
              total:getBlogCategorys.length,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const deleteBlogCategory = await BlogCategory.findByIdAndDelete(id);
        res.json({
            status:"success",
           message:"Blog Category delete successfully",
           deleteBlogCategory,
     });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createBlogCategory, updateBlogCategory, getBlogCategory, getAllBlogCategorys, deleteBlogCategory, };