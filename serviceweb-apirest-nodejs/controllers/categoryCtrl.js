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

module.exports = { createCategory };