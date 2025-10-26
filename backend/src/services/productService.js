const Product = require('../models/Product');

exports.createNewProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

exports.getAllProductsService = async (queryOptions) => {
  const {
    page = 1,
    limit = 20,
    sort = '-createdAt',
    search = '',
    category,
    minPrice,
    maxPrice
  } = queryOptions;

  const skip = (page - 1) * limit;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate('category')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return {
    products,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};

exports.getProductByIdService = async (productId) => {
  const product = await Product.findById(productId)
    .populate('category')
    .populate('reviews');

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

exports.updateProductService = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true
  });

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

exports.deleteProductService = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};

exports.getProductsByCategoryService = async (categoryId) => {
  const products = await Product.find({ category: categoryId }).populate(
    'category'
  );
  return products;
};

exports.getFeaturedProducts = async (limit = 10) => {
  const products = await Product.find({ isFeatured: true })
    .populate('category')
    .limit(limit)
    .sort('-createdAt');

  return products;
};

exports.updateProductStock = async (productId, quantity) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    throw new Error('Insufficient stock');
  }

  product.stock -= quantity;
  await product.save();

  return product;
};
