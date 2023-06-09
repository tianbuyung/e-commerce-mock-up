const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

router.get('/', ProductController.readProducts);
router.get('/:id', ProductController.readProductDetail);

module.exports = router;