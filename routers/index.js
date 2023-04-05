const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController')
const authRouter = require('./auth')
const adminRouter = require('./admin')
const profileRouter = require('./profiles')
const productRouter = require('./products')
const categoryRouter = require('./categories')
const isLoginMiddleWare = require('../middleware/loginMiddleware')

router.get("/register", HomeController.registerForm);
router.post("/register", HomeController.submitRegister);
router.get("/login", HomeController.loginForm);
router.post("/login", HomeController.submitLoginUser);
router.get("/", HomeController.homePage);
router.use("/products", productRouter);
router.use(isLoginMiddleWare);
router.use("/profile", profileRouter);
router.get("/logout", HomeController.getlogout);
module.exports = router;


// router.get('/', Controller.homePage);
// router.use('/', authRouter);
// router.use('/admin', adminRouter);
// router.use('/profiles', profileRouter);
// router.use('/products', productRouter);
// router.use('/categories', categoryRouter);

module.exports = router;