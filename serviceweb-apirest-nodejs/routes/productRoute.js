const express = require('express');
const { createProduct, getProduct, getAllProduct } = require('../controllers/productCtrl');
const router  = express.Router();

router.post(    "/add-product", createProduct);
router.get("/find-product/:id", getProduct);
router.get(     "/all-product", getAllProduct);

module.exports = router;