module.exports = {
    USER_ROLES: {
      USER: 'user',
      ADMIN: 'admin'
    },
  
    ORDER_STATUS: {
      PROCESSING: 'Processing',
      SHIPPED: 'Shipped',
      DELIVERED: 'Delivered',
      CANCELLED: 'Cancelled'
    },
  
    PAYMENT_METHODS: {
      COD: 'COD',
      CARD: 'Card',
      UPI: 'UPI',
      NET_BANKING: 'NetBanking'
    },
  
    PAYMENT_STATUS: {
      PENDING: 'Pending',
      COMPLETED: 'Completed',
      FAILED: 'Failed',
      REFUNDED: 'Refunded'
    },
  
    ADDRESS_TYPES: {
      HOME: 'Home',
      WORK: 'Work',
      OTHER: 'Other'
    },
  
    PRODUCT_SORT_OPTIONS: {
      NEWEST: '-createdAt',
      OLDEST: 'createdAt',
      PRICE_LOW_HIGH: 'price',
      PRICE_HIGH_LOW: '-price',
      NAME_A_Z: 'name',
      NAME_Z_A: '-name',
      RATING_HIGH_LOW: '-rating',
      RATING_LOW_HIGH: 'rating'
    },
  
    PAGINATION: {
      DEFAULT_PAGE: 1,
      DEFAULT_LIMIT: 20,
      MAX_LIMIT: 100
    },
  
    TAX_RATE: 0.18,
  
    FREE_SHIPPING_THRESHOLD: 500,
  
    SHIPPING_CHARGE: 50,
  
    IMAGE_UPLOAD: {
      MAX_SIZE: 5 * 1024 * 1024,
      ALLOWED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    },
  
    RATING: {
      MIN: 1,
      MAX: 5
    },
  
    PASSWORD: {
      MIN_LENGTH: 6,
      MAX_LENGTH: 128
    },
  
    ERROR_MESSAGES: {
      UNAUTHORIZED: 'Not authorized to access this route',
      FORBIDDEN: 'Access denied',
      NOT_FOUND: 'Resource not found',
      VALIDATION_ERROR: 'Validation failed',
      DUPLICATE_ERROR: 'Resource already exists',
      SERVER_ERROR: 'Internal server error',
      INVALID_CREDENTIALS: 'Invalid credentials',
      TOKEN_EXPIRED: 'Token expired',
      INVALID_TOKEN: 'Invalid token'
    },
  
    SUCCESS_MESSAGES: {
      USER_REGISTERED: 'User registered successfully',
      USER_LOGGED_IN: 'Logged in successfully',
      USER_LOGGED_OUT: 'Logged out successfully',
      PROFILE_UPDATED: 'Profile updated successfully',
      PASSWORD_UPDATED: 'Password updated successfully',
      PRODUCT_CREATED: 'Product created successfully',
      PRODUCT_UPDATED: 'Product updated successfully',
      PRODUCT_DELETED: 'Product deleted successfully',
      ORDER_CREATED: 'Order created successfully',
      ORDER_UPDATED: 'Order updated successfully',
      REVIEW_ADDED: 'Review added successfully',
      CART_UPDATED: 'Cart updated successfully'
    },
  
    HTTP_STATUS: {
      OK: 200,
      CREATED: 201,
      NO_CONTENT: 204,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      CONFLICT: 409,
      INTERNAL_SERVER_ERROR: 500
    }
  };
  