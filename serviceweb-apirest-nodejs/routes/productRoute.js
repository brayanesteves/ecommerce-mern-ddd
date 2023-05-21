const express = require('express');
const { createProduct, getProduct } = require('../controllers/productCtrl');
const router  = express.Router();

router.post(     "/add-product", createProduct);
router.get( "/find-product/:id", getProduct);

module.exports = router;