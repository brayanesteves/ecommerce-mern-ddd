const express = require('express');
const { createProduct, getProduct, getAllProduct, updateProduct } = require('../controllers/productCtrl');
const router  = express.Router();

router.post(      "/add-product", createProduct);
router.get(  "/find-product/:id", getProduct);
router.get(       "/all-product", getAllProduct);
router.put("/update-product/:id", updateProduct);

module.exports = router;