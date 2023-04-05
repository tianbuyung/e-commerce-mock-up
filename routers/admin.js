const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');

router.get('/products', adminControllers.readProducts);
router.get('/products/add', adminControllers.createProductForm);
router.post('/products/add', adminControllers.createProduct);
router.get('/products/:id/edit', adminControllers.updateProductForm);
router.post('/products/:id/edit', adminControllers.updateProduct);
router.get('/products/:id/delete', adminControllers.deleteProduct);

module.exports = router;