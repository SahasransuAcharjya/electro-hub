const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
  deleteOrder
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { orderValidator, idValidator, validate } = require('../middleware/validator');

router.use(protect);

router.post('/', orderValidator, validate, createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', idValidator, validate, getOrder);

router.use(authorize('admin'));

router.get('/', getAllOrders);
router.put('/:id/status', idValidator, validate, updateOrderStatus);
router.delete('/:id', idValidator, validate, deleteOrder);

module.exports = router;
