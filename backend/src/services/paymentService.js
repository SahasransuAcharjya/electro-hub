const config = require('../config/env');

exports.processPayment = async (paymentData) => {
  const { amount, paymentMethod, orderId } = paymentData;

  if (paymentMethod === 'COD') {
    return {
      success: true,
      paymentMethod: 'COD',
      message: 'Cash on Delivery selected'
    };
  }

  return {
    success: false,
    message: 'Payment method not implemented yet'
  };
};

exports.verifyPayment = async (paymentId, signature) => {
  return {
    success: true,
    verified: true
  };
};

exports.initiateRefund = async (orderId, amount) => {
  return {
    success: true,
    refundId: 'REFUND_' + Date.now(),
    amount,
    status: 'Pending'
  };
};

exports.getPaymentStatus = async (paymentId) => {
  return {
    success: true,
    status: 'Completed',
    paymentId
  };
};

exports.createPaymentIntent = async (amount, currency = 'INR') => {
  return {
    success: true,
    clientSecret: 'pi_' + Date.now(),
    amount,
    currency
  };
};
