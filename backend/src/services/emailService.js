const nodemailer = require('nodemailer');
const config = require('../config/env');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

exports.sendEmail = async (options) => {
  const mailOptions = {
    from: config.email.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email could not be sent');
  }
};

exports.sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Electro-Hub!';
  const text = `Hi ${user.name},\n\nWelcome to Electro-Hub! We're excited to have you on board.\n\nBest regards,\nElectro-Hub Team`;
  const html = `
    <h1>Welcome to Electro-Hub!</h1>
    <p>Hi ${user.name},</p>
    <p>We're excited to have you on board.</p>
    <p>Best regards,<br>Electro-Hub Team</p>
  `;

  await this.sendEmail({
    to: user.email,
    subject,
    text,
    html
  });
};

exports.sendOrderConfirmationEmail = async (user, order) => {
  const subject = `Order Confirmation - Order #${order._id}`;
  const text = `Hi ${user.name},\n\nYour order has been confirmed!\n\nOrder ID: ${order._id}\nTotal: ₹${order.totalPrice}\n\nThank you for shopping with Electro-Hub!\n\nBest regards,\nElectro-Hub Team`;
  const html = `
    <h1>Order Confirmation</h1>
    <p>Hi ${user.name},</p>
    <p>Your order has been confirmed!</p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p><strong>Total:</strong> ₹${order.totalPrice}</p>
    <p>Thank you for shopping with Electro-Hub!</p>
    <p>Best regards,<br>Electro-Hub Team</p>
  `;

  await this.sendEmail({
    to: user.email,
    subject,
    text,
    html
  });
};

exports.sendOrderStatusEmail = async (user, order) => {
  const subject = `Order Status Update - Order #${order._id}`;
  const text = `Hi ${user.name},\n\nYour order status has been updated to: ${order.orderStatus}\n\nOrder ID: ${order._id}\n\nBest regards,\nElectro-Hub Team`;
  const html = `
    <h1>Order Status Update</h1>
    <p>Hi ${user.name},</p>
    <p>Your order status has been updated to: <strong>${order.orderStatus}</strong></p>
    <p><strong>Order ID:</strong> ${order._id}</p>
    <p>Best regards,<br>Electro-Hub Team</p>
  `;

  await this.sendEmail({
    to: user.email,
    subject,
    text,
    html
  });
};

exports.sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${config.cors.origin}/reset-password/${resetToken}`;
  const subject = 'Password Reset Request';
  const text = `Hi ${user.name},\n\nYou requested a password reset. Please click the link below to reset your password:\n\n${resetUrl}\n\nIf you didn't request this, please ignore this email.\n\nBest regards,\nElectro-Hub Team`;
  const html = `
    <h1>Password Reset Request</h1>
    <p>Hi ${user.name},</p>
    <p>You requested a password reset. Please click the button below to reset your password:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none;">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
    <p>Best regards,<br>Electro-Hub Team</p>
  `;

  await this.sendEmail({
    to: user.email,
    subject,
    text,
    html
  });
};
