const express = require('express');
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, getAllProductsParams, addToWishlist } = require('../controllers/productCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-product", authMiddleware, isAdmin, createProduct);
router.get   (  "/find-product/:id", getProduct);
router.get   (     "/find-products", getAllProductsParams);
router.get   (       "/all-product", getAllProduct);
router.put   ("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.put   (          "/wishlist", authMiddleware, isAdmin, addToWishlist);
router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;