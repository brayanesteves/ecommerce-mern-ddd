const express = require('express');
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrands } = require('../controllers/brandCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-brand", authMiddleware, isAdmin, createBrand);
router.put   ("/update-brand/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/delete-brand/:id", authMiddleware, isAdmin, deleteBrand);
router.get   (   "/get-brand/:id", getBrand);
router.get   (      "/get-brands", getAllBrands);

module.exports = router;