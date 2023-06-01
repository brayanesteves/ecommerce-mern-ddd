const express = require('express');
const { createBlog, updateBlog, getBlog, getAllBlogs } = require('../controllers/blogCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post(       "/add-blog", authMiddleware, isAdmin, createBlog);
router.put ("/update-blog/:id", authMiddleware, isAdmin, updateBlog);
router.get (   "/get-blog/:id", getBlog);
router.get (      "/get-blogs", getAllBlogs);

module.exports = router;