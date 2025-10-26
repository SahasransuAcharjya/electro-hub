const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const {
  productValidator,
  idValidator,
  paginationValidator,
  validate
} = require('../middleware/validator');

router.get('/', paginationValidator, validate, getAllProducts);
router.get('/:id', idValidator, validate, getProduct);
router.get('/category/:categoryId', idValidator, validate, getProductsByCategory);

router.use(protect);
router.use(authorize('admin'));

router.post('/', productValidator, validate, createProduct);
router.put('/:id', idValidator, productValidator, validate, updateProduct);
router.delete('/:id', idValidator, validate, deleteProduct);

module.exports = router;
