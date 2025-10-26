const jwt = require('jsonwebtoken');
const config = require('./env');

/**
 * Generate JWT Token
 * @param {Object} payload - Data to encode in token
 * @returns {String} - JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

/**
 * Verify JWT Token
 * @param {String} token - JWT token to verify
 * @returns {Object} - Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Generate token and set cookie
 * @param {Object} user - User object
 * @param {Number} statusCode - HTTP status code
 * @param {Object} res - Express response object
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken({ id: user._id, role: user.role });
  
  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + config.jwt.cookieExpire * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: config.nodeEnv === 'production', // HTTPS in production
    sameSite: 'strict'
  };
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    });
};

/**
 * Decode token without verification (for debugging)
 * @param {String} token - JWT token
 * @returns {Object} - Decoded payload
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Generate refresh token
 * @param {Object} payload - Data to encode
 * @returns {String} - Refresh token
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: '30d' // Refresh tokens last longer
  });
};

/**
 * Extract token from request headers or cookies
 * @param {Object} req - Express request object
 * @returns {String|null} - Token or null
 */
const extractToken = (req) => {
  let token = null;
  
  // Check Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  
  return token;
};

module.exports = {
  generateToken,
  verifyToken,
  sendTokenResponse,
  decodeToken,
  generateRefreshToken,
  extractToken
};
