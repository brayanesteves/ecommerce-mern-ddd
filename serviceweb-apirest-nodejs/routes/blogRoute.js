const express = require('express');
const { createBlog, updateBlog } = require('../controllers/blogCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post(       "/add-blog", authMiddleware, isAdmin, createBlog);
router.put ("/update-blog/:id", authMiddleware, isAdmin, updateBlog);

module.exports = router;