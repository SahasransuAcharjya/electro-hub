exports.formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };
  
  exports.formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  exports.formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  exports.generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  exports.generateRandomString = (length = 10) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  exports.generateOrderId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${timestamp}-${random}`;
  };
  
  exports.calculateDiscount = (originalPrice, discountPercent) => {
    return originalPrice - (originalPrice * discountPercent) / 100;
  };
  
  exports.calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(2);
  };
  
  exports.truncateText = (text, length = 100) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
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
  
  exports.sanitizeUser = (user) => {
    const userObject = user.toObject ? user.toObject() : user;
    delete userObject.password;
    delete userObject.__v;
    return userObject;
  };
  
  exports.sanitizeProduct = (product) => {
    const productObject = product.toObject ? product.toObject() : product;
    delete productObject.__v;
    return productObject;
  };
  
  exports.paginationData = (page, limit, total) => {
    const currentPage = parseInt(page);
    const itemsPerPage = parseInt(limit);
    const totalPages = Math.ceil(total / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
  
    return {
      currentPage,
      itemsPerPage,
      totalPages,
      totalItems: total,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? currentPage + 1 : null,
      prevPage: hasPrevPage ? currentPage - 1 : null
    };
  };
  
  exports.calculateTax = (amount, taxRate = 0.18) => {
    return parseFloat((amount * taxRate).toFixed(2));
  };
  
  exports.calculateShipping = (amount, threshold = 500, charge = 50) => {
    return amount >= threshold ? 0 : charge;
  };
  
  exports.calculateOrderTotal = (itemsPrice, taxRate = 0.18, shippingThreshold = 500, shippingCharge = 50) => {
    const tax = this.calculateTax(itemsPrice, taxRate);
    const shipping = this.calculateShipping(itemsPrice, shippingThreshold, shippingCharge);
    const total = itemsPrice + tax + shipping;
  
    return {
      itemsPrice: parseFloat(itemsPrice.toFixed(2)),
      taxPrice: tax,
      shippingPrice: shipping,
      totalPrice: parseFloat(total.toFixed(2))
    };
  };
  
  exports.getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/default-product.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.BACKEND_URL || 'http://localhost:5000'}${imagePath}`;
  };
  
  exports.groupBy = (array, key) => {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    }, {});
  };
  
  exports.asyncHandler = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
  
  exports.pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };
  
  exports.omit = (object, keys) => {
    const result = { ...object };
    keys.forEach(key => delete result[key]);
    return result;
  };
  