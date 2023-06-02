const express = require('express');
const { createBlogCategory, updateBlogCategory, deleteBlogCategory, getBlogCategory, getAllBlogCategorys } = require('../controllers/blogCatCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-blogcategory", authMiddleware, isAdmin, createBlogCategory);
router.put   ("/update-blogcategory/:id", authMiddleware, isAdmin, updateBlogCategory);
router.delete("/delete-blogcategory/:id", authMiddleware, isAdmin, deleteBlogCategory);
router.get   (   "/get-blogcategory/:id", getBlogCategory);
router.get   (      "/get-blogcategorys", getAllBlogCategorys);

module.exports = router;