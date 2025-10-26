const User = require('../models/User');
const { generateToken } = require('../config/jwt');

exports.registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    phone
  });

  const token = generateToken({ id: user._id, role: user.role });

  return { user, token };
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user._id, role: user.role });

  user.password = undefined;

  return { user, token };
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

exports.updateUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken({ id: user._id, role: user.role });

  return { user, token };
};
