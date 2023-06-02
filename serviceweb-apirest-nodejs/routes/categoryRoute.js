const express = require('express');
const { createCategory, updateCategory, deleteCategory, getCategory } = require('../controllers/categoryCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-category", authMiddleware, isAdmin, createCategory);
router.put   ("/update-category/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/delete-category/:id", authMiddleware, isAdmin, deleteCategory);
router.get   (   "/get-category/:id", getCategory);

module.exports = router;