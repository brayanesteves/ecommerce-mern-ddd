const Category             = require("../models/categoryModel");
const User                 = require("../models/userModel");
const asyncHandler         = require("express-async-handler");
const { validateMongDbId } = require('../utils/validateMongodbId');

const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.json({
             status:"success",
            message:"Category add successfully",
            newCategory,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, { new:true, });
        res.json({
               status:"success",
              message:"Category update successfully",
            updateCategory,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json({
            status:"success",
           message:"Category delete successfully",
           deleteCategory,
     });
    } catch(error) {
        throw new Error(error);
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const getCategory = await Category.findById(id);
        res.json({
             status:"success",
            message:"Category find successfully",
            getCategory,
        });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createCategory, updateCategory, deleteCategory, getCategory };