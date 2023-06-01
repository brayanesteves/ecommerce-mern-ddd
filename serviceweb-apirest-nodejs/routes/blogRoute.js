const express = require('express');
const { createBlog } = require('../controllers/blogCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post("/add-blog", authMiddleware, isAdmin, createBlog);

module.exports = router;