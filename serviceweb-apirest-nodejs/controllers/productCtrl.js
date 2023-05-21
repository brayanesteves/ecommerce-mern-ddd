const Product      = require('../models/productModel');
const asyncHandler = require("express-async-handler");
const slugify      = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json({
            message:"Product add successfully",
            newProduct
        });
    } catch(error) {
        throw new Error(error);
    }    
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        let _id = id.id;
        const updateProduct = await Product.findByIdAndUpdate({ _id }, req.body, { new:true });
        res.json({
            id,
            message:"Product update successfully",
            updateProduct
        });
    } catch(error) {
        throw new Error(error);
    }    
});

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        
        let _id = id.id;
        const deleteProduct = await Product.findByIdAndDelete(_id);
        res.json({
            id,
            message:"Product delete successfully",
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

const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const getAllProduct = await Product.find();
        res.json({
            message:"Product get all successfully",
            getAllProduct
        });
    } catch(error) {
        throw new Error(error);
    }    
});

module.exports = { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct };