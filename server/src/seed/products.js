import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

dotenv.config();

// Furniture categories
const categories = [
  {
    name: 'Sofas & Couches',
    description: 'Comfortable seating for your living room',
  },
  {
    name: 'Dining Tables',
    description: 'Elegant tables for family meals',
  },
  {
    name: 'Bedroom Furniture',
    description: 'Beds, nightstands and storage',
  },
  {
    name: 'Office Furniture',
    description: 'Desks and chairs for work',
  },
  {
    name: 'Outdoor Furniture',
    description: 'Patio and garden pieces',
  },
  {
    name: 'Storage & Shelving',
    description: 'Cabinets, bookcases and more',
  },
];

// Sample furniture products
const products = [
  // Sofas
  {
    name: 'Modern Leather 3-Seater',
    description: 'Premium top-grain leather sofa with solid oak legs. Features high-density foam cushions for optimal comfort. Perfect for contemporary living rooms.',
    price: 2499,
    comparePrice: 3299,
    stock: 15,
    slug: 'modern-leather-3-seater',
    material: 'leather',
    finish: 'Cognac',
    dimensions: { length: 220, width: 95, height: 85 },
    images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', alt: 'Modern Leather Sofa' }],
  },
  {
    name: 'Velvet Chesterfield Sofa',
    description: 'Classic Chesterfield design with deep button tufting and rolled arms. Luxurious velvet upholstery in deep blue.',
    price: 1899,
    comparePrice: 2499,
    stock: 8,
    material: 'fabric',
    finish: 'Navy Blue',
    dimensions: { length: 210, width: 90, height: 80 },
    images: [{ url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800', alt: 'Chesterfield Sofa' }],
  },
  {
    name: 'Sectional Cloud Sofa',
    description: 'Ultra-deep modular sectional with cloud-like comfort. Modular design allows multiple configurations.',
    price: 4599,
    comparePrice: 5999,
    stock: 5,
    material: 'fabric',
    finish: 'Light Grey',
    dimensions: { length: 320, width: 180, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=800', alt: 'Sectional Sofa' }],
  },
  {
    name: 'Scandinavian Loveseat',
    description: 'Minimalist two-seater with clean lines and solid beech wood frame. Perfect for small apartments.',
    price: 899,
    comparePrice: 1199,
    stock: 22,
    material: 'fabric',
    finish: 'Natural Oak',
    dimensions: { length: 150, width: 80, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800', alt: 'Scandinavian Loveseat' }],
  },

  // Dining Tables
  {
    name: 'Live Edge Walnut Table',
    description: 'Stunning live edge walnut dining table. Each piece is unique with natural wood grain patterns. Seats 8-10.',
    price: 3499,
    comparePrice: 4299,
    stock: 3,
    material: 'solid-wood',
    finish: 'Walnut Natural',
    dimensions: { length: 240, width: 100, height: 76 },
    images: [{ url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', alt: 'Walnut Dining Table' }],
  },
  {
    name: 'Marble Top Dining Table',
    description: 'Elegant Carrara marble top with brushed brass base. Seats 6 comfortably. Stain-resistant sealant applied.',
    price: 2799,
    comparePrice: 3599,
    stock: 6,
    material: 'glass',
    finish: 'White Marble',
    dimensions: { length: 180, width: 90, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800', alt: 'Marble Dining Table' }],
  },
  {
    name: 'Extendable Oak Table',
    description: 'Solid oak dining table with hidden leaf extension. Seats 6-10 people. Smooth glide mechanism.',
    price: 1599,
    comparePrice: 1999,
    stock: 12,
    material: 'solid-wood',
    finish: 'White Oak',
    dimensions: { length: 180, width: 90, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800', alt: 'Oak Dining Table' }],
  },
  {
    name: 'Industrial Metal Table',
    description: 'Reclaimed steel top with blackened steel frame. Urban industrial aesthetic. Seats 8.',
    price: 1299,
    comparePrice: 1699,
    stock: 18,
    material: 'metal',
    finish: 'Weathered Steel',
    dimensions: { length: 200, width: 100, height: 76 },
    images: [{ url: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800', alt: 'Industrial Table' }],
  },

  // Bedroom
  {
    name: 'Upholstered King Bed',
    description: 'Luxurious upholstered king bed with tufted headboard. Solid wood frame with high-density foam padding.',
    price: 1899,
    comparePrice: 2499,
    stock: 10,
    material: 'fabric',
    finish: 'Charcoal Grey',
    dimensions: { length: 210, width: 190, height: 140 },
    images: [{ url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', alt: 'Upholstered Bed' }],
  },
  {
    name: 'Platform Bed with Storage',
    description: 'Low-profile platform bed with built-in under-bed drawers. Solid acacia wood with walnut finish.',
    price: 1499,
    comparePrice: 1999,
    stock: 7,
    material: 'solid-wood',
    finish: 'Walnut',
    dimensions: { length: 200, width: 160, height: 35 },
    images: [{ url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800', alt: 'Platform Bed' }],
  },
  {
    name: 'Modern Nightstand Pair',
    description: 'Pair of matching nightstands with soft-close drawers. White oak with black metal legs.',
    price: 499,
    comparePrice: 699,
    stock: 25,
    material: 'solid-wood',
    finish: 'Natural Oak',
    dimensions: { length: 50, width: 40, height: 55 },
    images: [{ url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800', alt: 'Nightstands' }],
  },

  // Office
  {
    name: 'Executive Standing Desk',
    description: 'Electric height-adjustable desk with memory presets. Bamboo top with cable management.',
    price: 1199,
    comparePrice: 1599,
    stock: 14,
    material: 'engineered-wood',
    finish: 'Bamboo',
    dimensions: { length: 160, width: 80, height: 120 },
    images: [{ url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', alt: 'Standing Desk' }],
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair with lumbar support, adjustable armrests, and breathable mesh back.',
    price: 799,
    comparePrice: 999,
    stock: 30,
    material: 'fabric',
    finish: 'Black Mesh',
    dimensions: { length: 70, width: 70, height: 120 },
    images: [{ url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800', alt: 'Office Chair' }],
  },
  {
    name: 'L-Shaped Corner Desk',
    description: 'Spacious L-shaped desk perfect for dual monitors. Includes keyboard tray and file cabinet.',
    price: 649,
    comparePrice: 849,
    stock: 11,
    material: 'engineered-wood',
    finish: 'Walnut',
    dimensions: { length: 160, width: 140, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800', alt: 'Corner Desk' }],
  },
  {
    name: 'Minimalist Writing Desk',
    description: 'Clean-lined writing desk with solid oak top and powder-coated steel frame.',
    price: 449,
    comparePrice: 599,
    stock: 20,
    material: 'solid-wood',
    finish: 'Natural Oak',
    dimensions: { length: 120, width: 60, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800', alt: 'Writing Desk' }],
  },

  // Outdoor
  {
    name: 'Teak Outdoor Sofa',
    description: 'Grade-A teak wood outdoor sofa with weather-resistant cushions. Built to last for years.',
    price: 2199,
    comparePrice: 2799,
    stock: 6,
    material: 'solid-wood',
    finish: 'Natural Teak',
    dimensions: { length: 200, width: 85, height: 80 },
    images: [{ url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800', alt: 'Outdoor Sofa' }],
  },
  {
    name: 'Cast Aluminum Dining Set',
    description: '6-piece outdoor dining set with cast aluminum table and 4 chairs. All-weather resistant.',
    price: 1699,
    comparePrice: 2199,
    stock: 4,
    material: 'metal',
    finish: 'Matte Black',
    dimensions: { length: 150, width: 90, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800', alt: 'Outdoor Dining Set' }],
  },
  {
    name: 'Rattan Lounge Chair',
    description: 'Hand-woven synthetic rattan lounge chair with plush cushions. UV and water resistant.',
    price: 599,
    comparePrice: 799,
    stock: 16,
    material: 'rattan',
    finish: 'Natural Wicker',
    dimensions: { length: 80, width: 75, height: 100 },
    images: [{ url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800', alt: 'Rattan Chair' }],
  },

  // Storage
  {
    name: 'Modular Bookshelf System',
    description: 'Customizable bookshelf system in white oak. Configure to fit your space. Includes various module sizes.',
    price: 1299,
    comparePrice: 1699,
    stock: 9,
    material: 'solid-wood',
    finish: 'White Oak',
    dimensions: { length: 180, width: 35, height: 200 },
    images: [{ url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800', alt: 'Bookshelf' }],
  },
  {
    name: 'Mid-Century Credenza',
    description: 'Elegant sideboard with sliding doors and adjustable shelving. Solid walnut with brass legs.',
    price: 1799,
    comparePrice: 2299,
    stock: 5,
    material: 'solid-wood',
    finish: 'Walnut',
    dimensions: { length: 180, width: 45, height: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', alt: 'Credenza' }],
  },
  {
    name: 'Industrial Pipe Shelf',
    description: 'Open shelving unit with black iron pipe frame and reclaimed wood shelves. Wall-mounted.',
    price: 349,
    comparePrice: 449,
    stock: 28,
    material: 'metal',
    finish: 'Black Iron',
    dimensions: { length: 120, width: 30, height: 90 },
    images: [{ url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800', alt: 'Pipe Shelf' }],
  },
  {
    name: 'Wardrobe Cabinet',
    description: 'Spacious wardrobe with hanging rail, drawers, and shelving. Soft-close hinges throughout.',
    price: 1399,
    comparePrice: 1799,
    stock: 8,
    material: 'engineered-wood',
    finish: 'Matte White',
    dimensions: { length: 150, width: 60, height: 200 },
    images: [{ url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800', alt: 'Wardrobe' }],
  },
  {
    name: 'Media Console',
    description: 'Low media console with cable management and soft-close doors. Fits up to 65" TV.',
    price: 799,
    comparePrice: 999,
    stock: 13,
    material: 'solid-wood',
    finish: 'Walnut',
    dimensions: { length: 180, width: 45, height: 50 },
    images: [{ url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', alt: 'Media Console' }],
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing categories and products...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create categories with slugs
    console.log('Creating categories...');
    const categoryData = categories.map(cat => ({
      ...cat,
      slug: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }));
    const createdCategories = await Category.insertMany(categoryData);
    console.log(`Created ${createdCategories.length} categories`);

    // Map category names to IDs
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Map products to category IDs
    const categoryNameMap = {
      'Sofas & Couches': 'Sofas & Couches',
      'Dining Tables': 'Dining Tables',
      'Bedroom Furniture': 'Bedroom Furniture',
      'Office Furniture': 'Office Furniture',
      'Outdoor Furniture': 'Outdoor Furniture',
      'Storage & Shelving': 'Storage & Shelving',
    };

    const productsWithCategories = products.map((product) => {
      // Determine category based on product type
      let categoryName = 'Storage & Shelving';
      if (product.name.includes('Sofa') || product.name.includes('Loveseat') || product.name.includes('Cloud')) {
        categoryName = 'Sofas & Couches';
      } else if (product.name.includes('Table') || product.name.includes('Dining')) {
        categoryName = 'Dining Tables';
      } else if (product.name.includes('Bed') || product.name.includes('Nightstand')) {
        categoryName = 'Bedroom Furniture';
      } else if (product.name.includes('Desk') || product.name.includes('Chair')) {
        categoryName = 'Office Furniture';
      } else if (product.name.includes('Outdoor') || product.name.includes('Rattan') || product.name.includes('Teak')) {
        categoryName = 'Outdoor Furniture';
      }

      return {
        ...product,
        category: categoryMap[categoryName],
      };
    });

    // Create products
    console.log('Creating products...');
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`Created ${createdProducts.length} products`);

    console.log('\n✅ Seed completed successfully!');
    console.log(`   Categories: ${createdCategories.length}`);
    console.log(`   Products: ${createdProducts.length}`);

    // List categories
    console.log('\nCategories created:');
    createdCategories.forEach((cat) => {
      console.log(`   - ${cat.name} (${cat.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();