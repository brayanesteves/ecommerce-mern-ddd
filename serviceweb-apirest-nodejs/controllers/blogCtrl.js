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
    validateMongDbId(id);
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
    validateMongDbId(id);
    try {
        const getBlog     = await Blog.findById(id).populate('likes').populate('dislikes');
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
    validateMongDbId(id);
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

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId }      = req.body;
    validateMongDbId(blogId);
    // Find the blog which you want to be liked.
    const blog            = await Blog.findById(blogId);
    // Find the login user.
    const loginUserId     = req?.user?._id;
    // Find if the user has liked the blog.
    const isLiked         = blog?.isLiked;
    // Find if the user has disliked the blog.
    const alreadyDisliked = blog?.dislikes?.find((userId) => userId?.toString() === loginUserId?.toString());
    try {
        if(alreadyDisliked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                     $pull:{ dislikes: loginUserId },
                isDisliked:false,
            }, { new:true });
            res.json({
                status:"success",
               message:"Blog dislike successfully",
               blog,
            });
        }
        if(isLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                     $pull:{ likes: loginUserId },
                isLiked:false,
            }, { new:true });
            res.json({
                 status:"success",
                message:"Blog like successfully",
                blog,
            });
        } else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                  $push:{ likes: loginUserId },
                isLiked:true,
            }, { new:true });
            res.json({
                 status:"success",
                message:"Blog like successfully",
                blog,
            });
        }       
    } catch(error) {
        throw new Error(error);
    }
});

const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId }   = req.body;
    validateMongDbId(blogId);
    // Find the blog which you want to be liked.
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId  = req?.user?._id;
    // Find if the user has liked the blog.
    const isDisLiked   = blog?.isDisliked;
    // Find if the user has disliked the blog.
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json({
         status:"success",
        message:"Blog dislike successfully",
        blog,
      });
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
               $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json({
         status:"success",
        message:"Blog dislike successfully",
        blog,
      });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
               $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json({
         status:"success",
        message:"Blog dislike successfully",
        blog,
      });
    }
});

module.exports = { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog };