const express = require('express');
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct } = require('../controllers/productCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const router  = express.Router();

router.post  (       "/add-product", isAdmin, authMiddleware, createProduct);
router.get   (  "/find-product/:id", getProduct);
router.get   (       "/all-product", getAllProduct);
router.put   ("/update-product/:id", isAdmin, authMiddleware, updateProduct);
router.delete("/delete-product/:id", isAdmin, authMiddleware, deleteProduct);

module.exports = router;