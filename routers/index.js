const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const profileRouter = require('./profiles')
const productRouter = require('./products')
const categoryRouter = require('./categories')
const isLoginMiddleWare = require('../middleware/loginMiddleware');
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

router.get('/', HomeController.homePage); // done
router.use('/', authRouter); // done
router.use('/products', isLoginMiddleWare, productRouter);
router.use('/profile', isLoginMiddleWare, profileRouter);
router.use('/admin', isAdminMiddleware, adminRouter); // done
router.use('/categories', categoryRouter);

module.exports = router;