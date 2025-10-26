const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.createNewOrder = async (userId, orderData) => {
  const { shippingAddress, paymentMethod } = orderData;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const orderItems = cart.items.map(item => ({
    product: item.product._id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.price,
    image: item.product.images[0] || ''
  }));

  const itemsPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxPrice = itemsPrice * 0.18;
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const order = await Order.create({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  });

  for (let item of cart.items) {
    await Product.findByIdAndUpdate(item.product._id, {
      $inc: { stock: -item.quantity }
    });
  }

  cart.items = [];
  await cart.save();

  return order;
};

exports.getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  return orders;
};

exports.getOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate('user', 'name email');

  if (!order) {
    throw new Error('Order not found');
  }

  return order;
};

exports.updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = status;

  if (status === 'Delivered') {
    order.deliveredAt = Date.now();
    order.isPaid = true;
    order.paidAt = Date.now();
  }

  await order.save();

  return order;
};

exports.getAllOrdersService = async () => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  return { orders, totalAmount };
};

exports.calculateOrderPrices = (items) => {
  const itemsPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxPrice = itemsPrice * 0.18;
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
