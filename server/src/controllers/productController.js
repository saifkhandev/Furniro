import Category from '../models/Category.js';
import Product from '../models/Product.js';

// ========== CATEGORY CONTROLLERS ==========

/**
 * Create category (admin only)
 * POST /api/categories
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.validatedBody;

    const category = new Category({
      name,
      description,
    });

    await category.save();

    res.status(201).json({
      status: 'success',
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Category name already exists',
      });
    }
    next(error);
  }
};

/**
 * Get all categories (public)
 * GET /api/categories
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });

    res.status(200).json({
      status: 'success',
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update category (admin only)
 * PUT /api/categories/:id
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const updates = req.validatedBody;

    const category = await Category.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category (admin only)
 * DELETE /api/categories/:id
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// ========== PRODUCT CONTROLLERS ==========

/**
 * Create product (admin only)
 * POST /api/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const { categoryId, ...productData } = req.validatedBody;

    // Verify category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        status: 'error',
        message: 'Category not found',
      });
    }

    const product = new Product({
      ...productData,
      category: categoryId,
    });

    await product.save();
    await product.populate('category', 'name slug');

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Product slug already exists',
      });
    }
    next(error);
  }
};

/**
 * List products (public with filters)
 * GET /api/products
 */
export const listProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      material,
      minPrice,
      maxPrice,
      sort = 'newest',
    } = req.validatedQuery;

    // Build filter object
    const filter = { isActive: true };

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (material) {
      filter.material = material;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    // Build sort object
    let sortObj = {};
    switch (sort) {
      case 'price-low':
        sortObj = { price: 1 };
        break;
      case 'price-high':
        sortObj = { price: -1 };
        break;
      case 'popular':
        sortObj = { rating: -1 };
        break;
      case 'newest':
      default:
        sortObj = { createdAt: -1 };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    // Fetch products
    const products = await Product.find(filter)
      .populate('category', 'name slug')
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .lean();

    res.status(200).json({
      status: 'success',
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by slug (public)
 * GET /api/products/:slug
 */
export const getProduct = async (req, res, next) => {
  try {
    const { slug } = req.validatedParams;

    const product = await Product.findOne({ slug, isActive: true })
      .populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product (admin only)
 * PUT /api/products/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;
    const { categoryId, ...updates } = req.validatedBody;

    // Verify category if updating it
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          status: 'error',
          message: 'Category not found',
        });
      }
      updates.category = categoryId;
    }

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product (admin only)
 * DELETE /api/products/:id
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.validatedParams;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
