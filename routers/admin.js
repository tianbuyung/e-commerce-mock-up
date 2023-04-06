const express = require('express');
const router = express.Router();
const AdminControllers = require('../controllers/adminController');

router.get('/products', AdminControllers.readProducts);
router.get('/products/add', AdminControllers.createProductForm);
router.post('/products/add', AdminControllers.createProduct);
router.get('/products/email', AdminControllers.sendEmailForm);
router.post('/products/email', AdminControllers.sendEmail);
router.get('/products/:id/edit', AdminControllers.updateProductForm);
router.post('/products/:id/edit', AdminControllers.updateProduct);
router.get('/products/:id/delete', AdminControllers.deleteProduct);

module.exports = router;