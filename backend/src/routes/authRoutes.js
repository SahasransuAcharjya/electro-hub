const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  updatePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  registerValidator,
  loginValidator,
  updatePasswordValidator,
  validate
} = require('../middleware/validator');

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePasswordValidator, validate, updatePassword);

module.exports = router;
