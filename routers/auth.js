const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')

router.get("/register", AuthController.registerForm);
router.post("/register", AuthController.submitRegister);
router.get("/login", AuthController.loginForm);
router.post("/login", AuthController.submitLoginUser);
router.get("/logout", AuthController.getLogout);

module.exports = router;