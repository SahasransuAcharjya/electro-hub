const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { cartValidator, validate } = require('../middleware/validator');

router.use(protect);

router.get('/', getCart);
router.post('/add', cartValidator, validate, addToCart);
router.put('/update', cartValidator, validate, updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
