const express = require('express');
const router = express.Router();
const Controller = require('../controllers/homeController')
// const profileRouter = require('./profiles')
// const productRouter = require('./products')

router.get('/', Controller.home);
// router.use('/products', productRouter);
// router.use('/profiles', profileRouter);

module.exports = router;