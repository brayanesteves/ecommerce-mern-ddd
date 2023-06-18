const Brand                = require("../models/brandModel");
const User                 = require("../models/userModel");
const asyncHandler         = require("express-async-handler");
const { validateMongDbId } = require('../utils/validateMongodbId');

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json({
             status:"success",
            message:"Brand add successfully",
            newBrand,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new:true, });
        res.json({
               status:"success",
              message:"Brand update successfully",
            updateBrand,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const getBrand = await Brand.findById(id);
        res.json({
             status:"success",
            message:"Brand find successfully",
            getBrand,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const getAllBrands = asyncHandler(async (req, res) => {
    try {
        const getBrands = await Brand.find();
        res.json({
             status:"success",
            message:"Brand finds successfully",
            getBrands,
              total:getBrands.length,
        });
    } catch(error) {
        throw new Error(error);
    }
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongDbId(id);
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json({
            status:"success",
           message:"Brand delete successfully",
           deleteBrand,
     });
    } catch(error) {
        throw new Error(error);
    }
});

module.exports = { createBrand, updateBrand, getBrand, getAllBrands, deleteBrand, };