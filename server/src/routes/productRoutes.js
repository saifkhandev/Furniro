import express from 'express';
import { protect, admin } from '../middleware/index.js';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createProduct,
  listProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  listProductsSchema,
  getProductSchema,
} from '../validations/productValidation.js';
import { validate } from '../middleware/index.js';

const router = express.Router();

// ========== PUBLIC ROUTES ==========

// Categories
router.get('/categories', getCategories);

// Products
router.get('/', validate(listProductsSchema), listProducts);
router.get('/:slug', validate(getProductSchema), getProduct);

// ========== ADMIN ROUTES ==========

// Categories (admin only)
router.post('/categories', protect, admin, validate(createCategorySchema), createCategory);
router.put('/categories/:id', protect, admin, validate(updateCategorySchema), updateCategory);
router.delete('/categories/:id', protect, admin, validate(deleteCategorySchema), deleteCategory);

// Products (admin only)
router.post('/', protect, admin, validate(createProductSchema), createProduct);
router.put('/:id', protect, admin, validate(updateProductSchema), updateProduct);
router.delete('/:id', protect, admin, validate(deleteProductSchema), deleteProduct);

export default router;
