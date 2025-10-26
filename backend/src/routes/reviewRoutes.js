const express = require('express');
const router = express.Router();
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');
const { reviewValidator, idValidator, validate } = require('../middleware/validator');

router.get('/product/:productId', idValidator, validate, getProductReviews);

router.use(protect);

router.post('/', reviewValidator, validate, createReview);
router.put('/:id', idValidator, validate, updateReview);
router.delete('/:id', idValidator, validate, deleteReview);

module.exports = router;
