import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-100 mt-20">
      <div className="max-w-container mx-auto px-container-px py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-4">
              Grove & Co.
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Curated furniture and interior goods for modern living spaces.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/shop"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/inspiration"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Inspiration
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-neutral-800 pt-12 mb-12">
          <h4 className="font-semibold text-white mb-4">Subscribe to Our Newsletter</h4>
          <form className="flex gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-neutral-400 text-sm">
            &copy; {new Date().getFullYear()} Grove & Co. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
