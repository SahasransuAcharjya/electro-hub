exports.isValidObjectId = (id) => {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(id);
  };
  
  exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  exports.isValidPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };
  
  exports.isValidPincode = (pincode) => {
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
  };
  
  exports.isValidPassword = (password) => {
    return password && password.length >= 6;
  };
  
  exports.isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  exports.isValidPrice = (price) => {
    return typeof price === 'number' && price >= 0;
  };
  
  exports.isValidQuantity = (quantity) => {
    return Number.isInteger(quantity) && quantity > 0;
  };
  
  exports.isValidRating = (rating) => {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5;
  };
  
  exports.isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };
  
  exports.isValidImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
  
    if (!file) return false;
    if (!allowedTypes.includes(file.mimetype)) return false;
    if (file.size > maxSize) return false;
  
    return true;
  };
  
  exports.sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
  };
  
  exports.validateProductData = (data) => {
    const errors = [];
  
    if (!data.name || data.name.trim().length === 0) {
      errors.push('Product name is required');
    }
  
    if (!data.description || data.description.trim().length === 0) {
      errors.push('Product description is required');
    }
  
    if (!this.isValidPrice(data.price)) {
      errors.push('Valid price is required');
    }
  
    if (!data.category || !this.isValidObjectId(data.category)) {
      errors.push('Valid category is required');
    }
  
    if (data.stock !== undefined && !Number.isInteger(data.stock)) {
      errors.push('Stock must be an integer');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  exports.validateOrderData = (data) => {
    const errors = [];
  
    if (!data.shippingAddress || typeof data.shippingAddress !== 'object') {
      errors.push('Shipping address is required');
    } else {
      if (!data.shippingAddress.address) errors.push('Address is required');
      if (!data.shippingAddress.city) errors.push('City is required');
      if (!data.shippingAddress.postalCode) errors.push('Postal code is required');
      if (!data.shippingAddress.country) errors.push('Country is required');
    }
  
    if (!data.paymentMethod) {
      errors.push('Payment method is required');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  exports.validateUserData = (data) => {
    const errors = [];
  
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
  
    if (!this.isValidEmail(data.email)) {
      errors.push('Valid email is required');
    }
  
    if (!this.isValidPassword(data.password)) {
      errors.push('Password must be at least 6 characters');
    }
  
    if (data.phone && !this.isValidPhone(data.phone)) {
      errors.push('Invalid phone number');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  exports.validateReviewData = (data) => {
    const errors = [];
  
    if (!this.isValidRating(data.rating)) {
      errors.push('Rating must be between 1 and 5');
    }
  
    if (!data.comment || data.comment.trim().length < 10) {
      errors.push('Comment must be at least 10 characters');
    }
  
    if (!data.productId || !this.isValidObjectId(data.productId)) {
      errors.push('Valid product ID is required');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  