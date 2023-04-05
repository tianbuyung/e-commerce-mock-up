const express = require('express');
const router = express.Router();
const Controller = require('../controllers/homeController')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const profileRouter = require('./profiles')
const productRouter = require('./products')
const categoryRouter = require('./categories')

router.get('/', Controller.home);
router.use('/', authRouter);
router.use('/admin', adminRouter);
router.use('/profiles', profileRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);

module.exports = router;