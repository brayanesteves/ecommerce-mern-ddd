const Product      = require('../models/productModel');
const User         = require("../models/userModel");
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

const getAllProductsParams = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj      = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr     = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query    = Product.find(JSON.parse(queryStr));
  
      // Sorting  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query        = query.sort(sortBy);
      } else {
        query        = query.sort("-createdAt");
      }
  
      // limiting the fields  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query        = query.select(fields);
      } else {
        query        = query.select("-__v");
      }
  
      // pagination  
      const page  = req.query.page;
      const limit = req.query.limit;
      const skip  = (page - 1) * limit;
      query       = query.skip(skip).limit(limit);
      if (req.query.page) {
        const productCount = await Product.countDocuments();
        if (skip >= productCount) {
            throw new Error("This Page does not exists");
        }
      }
      const product = await query;
      res.json({
        message:"Products found's successfully",
        product 
      });
    } catch (error) {
      throw new Error(error);
    }
});

const addToWishlist = asyncHandler(async (req, res) => {
    const { _id }    = req.user;
    const { prodId } = req.body;
    try {
      const user         = await User.findById(_id);
      const alreadyadded = user.wishList.find((id) => id.toString() === prodId);
      if(alreadyadded) {
        let user = await User.findByIdAndUpdate(_id, {
            $pull: { wishList:prodId },
        }, { new:true, });
        res.json({
          message:"Add to Wishlist successfully",
          user,
        });
      } else {
        let user = await User.findByIdAndUpdate(_id, {
            $push: { wishList:prodId },
        }, { new:true, });
        res.json({
          message:"Add to Wishlist successfully",
          user,
        });
      }
    } catch (error) {
      throw new Error(error);
    }
});

module.exports = { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, getAllProductsParams, addToWishlist, };