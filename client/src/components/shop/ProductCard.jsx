import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-all duration-300"
    >
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-ink/5 relative">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h2 className="font-display text-xl font-semibold text-ink mb-1 group-hover:text-ink/80 transition-colors">
            {product.name}
          </h2>
          <p className="text-ink-muted text-sm mb-2 line-clamp-2">
            {product.description || product.category}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-ink">
              ${product.price?.toFixed(2)}
            </p>
            {product.material && (
              <span className="text-xs bg-ink/5 text-ink-muted px-2 py-1 rounded">
                {product.material}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}