import { z } from 'zod';

// Category schemas
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required').max(100),
    description: z.string().optional(),
  }).strict(),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
  }).strict(),
  params: z.object({
    id: z.string().min(1, 'Category ID required'),
  }).strict(),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Category ID required'),
  }).strict(),
});

// Product schemas
export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required').max(200),
    description: z.string().optional(),
    price: z.number().min(0, 'Price must be positive'),
    comparePrice: z.number().min(0).optional(),
    stock: z.number().min(0, 'Stock cannot be negative'),
    categoryId: z.string().min(1, 'Category ID required'),
    material: z.enum(['solid-wood', 'engineered-wood', 'fabric', 'metal', 'glass', 'plastic']).optional(),
    finish: z.string().optional(),
    dimensions: z.object({
      length: z.number().min(0).optional(),
      width: z.number().min(0).optional(),
      height: z.number().min(0).optional(),
    }).optional(),
    images: z.array(z.object({
      url: z.string().url('Invalid image URL'),
      alt: z.string().optional(),
    })).optional(),
  }).strict(),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(200).optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    comparePrice: z.number().min(0).optional(),
    stock: z.number().min(0).optional(),
    categoryId: z.string().optional(),
    material: z.enum(['solid-wood', 'engineered-wood', 'fabric', 'metal', 'glass', 'plastic']).optional(),
    finish: z.string().optional(),
    dimensions: z.object({
      length: z.number().min(0).optional(),
      width: z.number().min(0).optional(),
      height: z.number().min(0).optional(),
    }).optional(),
    images: z.array(z.object({
      url: z.string().url(),
      alt: z.string().optional(),
    })).optional(),
    isActive: z.boolean().optional(),
  }).strict(),
  params: z.object({
    id: z.string().min(1, 'Product ID required'),
  }).strict(),
});

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Product ID required'),
  }).strict(),
});

// Public listing schemas
export const listProductsSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).default('1'),
    limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).default('12'),
    category: z.string().optional(),
    material: z.enum(['solid-wood', 'engineered-wood', 'fabric', 'metal', 'glass', 'plastic']).optional(),
    minPrice: z.string().regex(/^\d+(\.\d+)?$/).transform(Number).optional(),
    maxPrice: z.string().regex(/^\d+(\.\d+)?$/).transform(Number).optional(),
    sort: z.enum(['newest', 'price-low', 'price-high', 'popular']).default('newest'),
  }).strict(),
});

export const getProductSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Product slug required'),
  }).strict(),
});
