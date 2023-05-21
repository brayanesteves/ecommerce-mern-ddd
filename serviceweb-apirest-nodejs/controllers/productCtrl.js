const Product      = require('../models/productModel');
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json({
            message:"Product add successfully",
            newProduct
        });
    } catch(error) {
        throw new Error(error);
    }    
});

const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const findProduct = await Product.findById(id);
        res.json({
            message:"Product find successfully",
            findProduct
        });
    } catch(error) {
        throw new Error(error);
    }    
});

module.exports = { createProduct, getProduct };