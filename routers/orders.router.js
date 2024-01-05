const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller');

router.get('/', ordersController.getOrders);
router.get('/:orderId', ordersController.getOrderById);
router.get('/mesero/:nombreMesero', ordersController.getOrdersByMesero);
router.get('/mesa/:numeroMesa', ordersController.getOrdersByMesa);
router.post('/', ordersController.createNewOrder);
router.put('/:orderId', ordersController.updateOrder);
router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;