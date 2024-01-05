const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');
const authMiddleware = require("../utils/auth.middleware");

router.get('/', productController.getProducts);

router.get('/:productId', productController.getProductsById);

router.post('/', productController.newProduct);

router.put('/:productId', productController.updateProduct);

router.delete('/:productId', productController.deleteProduct);

module.exports = router;