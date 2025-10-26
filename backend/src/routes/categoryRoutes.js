const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const { categoryValidator, idValidator, validate } = require('../middleware/validator');

router.get('/', getAllCategories);
router.get('/:id', idValidator, validate, getCategory);

router.use(protect);
router.use(authorize('admin'));

router.post('/', categoryValidator, validate, createCategory);
router.put('/:id', idValidator, categoryValidator, validate, updateCategory);
router.delete('/:id', idValidator, validate, deleteCategory);

module.exports = router;
