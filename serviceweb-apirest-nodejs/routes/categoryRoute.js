const express = require('express');
const { createCategory, updateCategory } = require('../controllers/categoryCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-category", authMiddleware, isAdmin, createCategory);
router.put   ("/update-category/:id", authMiddleware, isAdmin, updateCategory);

module.exports = router;