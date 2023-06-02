const express = require('express');
const { createCategory } = require('../controllers/categoryCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  ("/add-category", authMiddleware, isAdmin, createCategory);

module.exports = router;