const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const cartRoutes = require('./cartRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

// Use routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
