const express = require('express');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, dislikeBlog } = require('../controllers/blogCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-blog", authMiddleware, isAdmin, createBlog);
router.put   ("/update-blog/:id", authMiddleware, isAdmin, updateBlog);
router.get   (   "/get-blog/:id", getBlog);
router.get   (      "/get-blogs", getAllBlogs);
router.delete("/delete-blog/:id", authMiddleware, isAdmin, deleteBlog);
router.put   (           "/like", authMiddleware, isAdmin, likeBlog);
router.put   (        "/dislike", authMiddleware, isAdmin, dislikeBlog);

module.exports = router;