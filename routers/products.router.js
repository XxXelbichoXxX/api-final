const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const authMiddleware = require("../utils/auth.middleware");

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductsById);

router.post('/', authMiddleware.authenticateToken, productController.newProduct);

router.put('/:productId', authMiddleware.authenticateToken, productController.updateProduct);

router.delete('/:productId', authMiddleware.authenticateToken, productController.deleteProduct);

module.exports = router;