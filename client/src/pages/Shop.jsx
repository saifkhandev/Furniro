import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { productsAPI, categoriesAPI } from '../lib/api';
import ProductCard from '../components/shop/ProductCard';

export default function Shop() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    material: '',
    sort: 'newest',
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: catData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesAPI.getAll,
  });

  const { data: prodData, isLoading } = useQuery({
    queryKey: ['products', page, filters],
    queryFn: () => productsAPI.getAll({ page, limit: 12, ...filters }),
  });

  const products = prodData?.data?.data || [];
  const totalPages = prodData?.data?.totalPages || 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-container mx-auto px-container-px py-12">
        <h1 className="font-display text-5xl font-bold text-ink mb-2">
          Shop Collection
        </h1>
        <p className="text-ink-muted text-lg mb-6">
          Browse our curated furniture collection — filter by category, price, and material.
        </p>

        {/* Filter bar + mobile toggle */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden px-4 py-2 bg-ink text-white rounded-lg font-medium"
          >
            Filters
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-ink/5 rounded-lg font-medium text-ink/60"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12l2-2m6 4l2-2m-6 4l2-2" />
            </svg>
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-display text-xl font-semibold text-ink mb-4">Filters</h3>
              <div className="space-y-4">
                <select
                  onChange={e =>
                    setFilters(f => ({ ...f, category: e.target.value }))
                  }
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                >
                  <option value="">All Categories</option>
                  {(catData?.data?.data || []).map(c => (
                    <option key={c._id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <select
                  onChange={e =>
                    setFilters(f => ({ ...f, material: e.target.value }))
                  }
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                >
                  <option value="">All Materials</option>
                  <option value="solid-wood">Solid Wood</option>
                  <option value="fabric">Fabric</option>
                  <option value="metal">Metal</option>
                  <option value="glass">Glass</option>
                  <option value="plastic">Plastic</option>
                  <option value="leather">Leather</option>
                  <option value="rattan">Rattan</option>
                </select>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                    onChange={e =>
                      setFilters(f => ({ ...f, minPrice: e.target.value }))
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                    onChange={e =>
                      setFilters(f => ({ ...f, maxPrice: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile drawer */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed inset-y-0 left-0 z-50 w-full md:w-72 bg-white shadow-2xl p-6 md:hidden overflow-y-auto"
              >
                <button
                  onClick={() => setMobileOpen(false)}
                  className="mb-4 text-ink font-medium text-sm float-right"
                >
                  Close
                </button>
                <h3 className="font-display text-xl font-semibold mb-4">Filters</h3>
                <div className="space-y-4">
                  <select
                    onChange={e =>
                      setFilters(f => ({ ...f, category: e.target.value }))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                  >
                    <option value="">All</option>
                    {(catData?.data?.data || []).map(c => (
                      <option key={c._id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={e =>
                      setFilters(f => ({ ...f, material: e.target.value }))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                  >
                    <option value="">All Materials</option>
                    <option value="solid-wood">Solid Wood</option>
                    <option value="fabric">Fabric</option>
                    <option value="metal">Metal</option>
                    <option value="glass">Glass</option>
                    <option value="plastic">Plastic</option>
                    <option value="leather">Leather</option>
                    <option value="rattan">Rattan</option>
                  </select>

                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min $"
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                      onChange={e =>
                        setFilters(f => ({ ...f, minPrice: e.target.value }))
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max $"
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                      onChange={e =>
                        setFilters(f => ({ ...f, maxPrice: e.target.value }))
                      }
                    />
                  </div>

                  <select
                    onChange={e =>
                      setFilters(f => ({ ...f, sort: e.target.value }))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-surface"
                  >
                    <option value="newest">Newest</option>
                    <option value="priceAsc">Price Low → High</option>
                    <option value="priceDesc">Price High → Low</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <main className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <select
                onChange={e =>
                  setFilters(f => ({ ...f, sort: e.target.value }))
                }
                className="border border-border rounded-lg px-3 py-2 text-sm bg-white"
              >
                <option value="newest">Newest</option>
                <option value="priceAsc">Price Low → High</option>
                <option value="priceDesc">Price High → Low</option>
              </select>
            </div>

            {isLoading ? (
              <p className="text-ink-muted text-sm text-center py-8">Loading products…</p>
            ) : products.length === 0 ? (
              <p className="text-ink-muted text-center py-8">
                No products match your filters. Try adjusting your criteria.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={
                      `px-3 py-1 rounded-lg text-sm font-medium ${
                        page === i + 1 ? 'bg-ink text-white' : 'bg-white border border-border text-ink'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}