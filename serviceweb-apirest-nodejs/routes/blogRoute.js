const express = require('express');
const { createBlog, updateBlog, getBlog } = require('../controllers/blogCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post(       "/add-blog", authMiddleware, isAdmin, createBlog);
router.put ("/update-blog/:id", authMiddleware, isAdmin, updateBlog);
router.get (   "/get-blog/:id", getBlog);

module.exports = router;