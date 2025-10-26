const express = require('express');
const router = express.Router();
const {
  updateProfile,
  deleteProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { idValidator, validate } = require('../middleware/validator');

router.use(protect);

router.put('/profile', updateProfile);
router.delete('/profile', deleteProfile);

router.use(authorize('admin'));

router.get('/', getAllUsers);
router.get('/:id', idValidator, validate, getUser);
router.put('/:id', idValidator, validate, updateUser);
router.delete('/:id', idValidator, validate, deleteUser);

module.exports = router;
