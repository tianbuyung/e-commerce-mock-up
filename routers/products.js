const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/productController');
const isLoginMiddleWare = require("../middleware/loginMiddleware");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

router.get('/', );
router.get('/:id', );
router.use(isLoginMiddleWare);
router.use(isAdminMiddleware);

module.exports = router;