import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useCartStore from '../store/cartStore';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    // Hero entrance animation
    const hero = heroRef.current;
    if (hero) {
      gsap.fromTo(
        hero.querySelector('.hero-text'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        hero.querySelector('.hero-sub'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.5 }
      );
      gsap.fromTo(
        hero.querySelector('.hero-cta'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.7 }
      );
    }

    // Scroll-triggered reveal for featured section
    const featured = featuredRef.current;
    if (featured) {
      const cards = featured.querySelectorAll('.product-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });
    }

    // Reduced-motion: disable animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.clear();
      if (featured) {
        featured.querySelectorAll('.product-card').forEach((el) => {
          el.style.opacity = 1;
          el.style.transform = 'none';
        });
      }
    }
  }, []);

  // Featured products data (matches seed)
  const featuredProducts = [
    {
      name: 'Modern Leather 3-Seater',
      price: 2499,
      comparePrice: 3299,
      slug: 'modern-leather-3-seater',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
      category: 'Sofas',
    },
    {
      name: 'Live Edge Walnut Table',
      price: 3499,
      comparePrice: 4299,
      slug: 'live-edge-walnut-table',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600',
      category: 'Dining',
    },
    {
      name: 'Executive Standing Desk',
      price: 1199,
      comparePrice: 1599,
      slug: 'executive-standing-desk',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600',
      category: 'Office',
    },
    {
      name: 'Teak Outdoor Sofa',
      price: 2199,
      comparePrice: 2799,
      slug: 'teak-outdoor-sofa',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600',
      category: 'Outdoor',
    },
  ];

  const categories = [
    { name: 'Sofas & Couches', slug: 'sofas-couches', count: '4 products', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400' },
    { name: 'Dining Tables', slug: 'dining-tables', count: '4 products', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=400' },
    { name: 'Bedroom Furniture', slug: 'bedroom-furniture', count: '3 products', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400' },
    { name: 'Office Furniture', slug: 'office-furniture', count: '4 products', image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400' },
    { name: 'Outdoor Furniture', slug: 'outdoor-furniture', count: '3 products', image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400' },
    { name: 'Storage & Shelving', slug: 'storage-shelving', count: '5 products', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400' },
  ];

  const addToCart = (product) => {
    useCartStore.getState().addItem({
      _id: product.slug,
      name: product.name,
      price: product.price,
      slug: product.slug,
      images: [{ url: product.image, alt: product.name }],
    }, 1);
  };

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden bg-neutral-900">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
            alt="Premium furniture interior"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 via-neutral-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-container mx-auto px-container-px w-full pt-24 pb-16">
          <div className="max-w-2xl">
            <p className="hero-text text-primary-light font-medium tracking-wide uppercase text-sm mb-6">
              New Collection — Autumn 2026
            </p>
            <h1 className="hero-text font-display text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
              Crafted for<br />
              <span className="text-neutral-300">the way</span><br />
              you live.
            </h1>
            <p className="hero-sub text-neutral-200 text-xl md:text-2xl leading-relaxed max-w-lg mb-10">
              Premium furniture and interiors designed for modern spaces. Each piece is made with purpose, material, and craft.
            </p>
            <div className="hero-cta flex gap-4 flex-wrap">
              <Link
                to="/shop"
                className="inline-block bg-primary text-white px-8 py-4 rounded-md font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Explore Collection
              </Link>
              <Link
                to="/inspiration"
                className="inline-block border border-white/30 text-white px-8 py-4 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                View Inspiration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-24 bg-background">
        <div className="max-w-container mx-auto px-container-px">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">Shop by Category</h2>
            <p className="text-ink-muted text-lg">Curated pieces across every room of your home</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?category=${cat.slug}`}
                className="group relative overflow-hidden rounded-xl aspect-[4/5] block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary-light transition-colors">{cat.name}</h3>
                  <p className="text-white/80 text-sm">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="py-24 bg-surface-secondary">
        <div className="max-w-container mx-auto px-container-px">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-3">Featured Pieces</h2>
              <p className="text-ink-muted text-lg">Hand-selected favorites from our latest arrivals</p>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
            >
              View All <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <article key={product.slug} className="product-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[4/5]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    SALE
                  </div>
                </Link>
                <div className="p-6">
                  <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2 leading-snug">
                    <Link to={`/product/${product.slug}`} className="hover:text-primary transition-colors">{product.name}</Link>
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-ink font-bold text-lg">${product.price.toLocaleString()}</span>
                    <span className="text-ink-muted line-through text-sm">${product.comparePrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-ink text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Inspiration / Lifestyle Section */}
      <section className="py-24 bg-background">
        <div className="max-w-container mx-auto px-container-px">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight">
                Design your space.<br />
                <span className="text-secondary">Make it yours.</span>
              </h2>
              <p className="text-ink-muted text-lg leading-relaxed mb-8">
                From warm wood textures to clean modern lines — explore interiors that feel lived-in, not staged. Our inspiration guides help you bring together pieces that work together.
              </p>
              <Link
                to="/inspiration"
                className="inline-block bg-primary text-white px-8 py-4 rounded-md font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Browse Inspiration
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={
                    [
                      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400',
                      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
                      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400',
                      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
                    ][i - 1]
                  }
                  alt="Interior design inspiration"
                  className="rounded-xl shadow-md w-full aspect-[4/5] object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Banner */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-container mx-auto px-container-px text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Be the first to discover new arrivals</h2>
          <p className="text-neutral-300 text-lg mb-8 max-w-xl mx-auto">Join our newsletter for early access, studio notes, and curated inspiration — delivered once a week.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Subscribed! (stub)'); }}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-md bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary border-none"
              required
            />
            <button type="submit" className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
