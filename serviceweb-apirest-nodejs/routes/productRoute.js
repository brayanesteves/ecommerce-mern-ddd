const express = require('express');
const { createProduct } = require('../controllers/productCtrl');
const router  = express.Router();

router.post("/add-product", createProduct);

module.exports = router;