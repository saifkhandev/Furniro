import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuthStore();
  const { getTotalItems, openCart } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-container mx-auto px-container-px">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-2xl font-bold text-ink hover:text-primary transition-colors"
          >
            Grove & Co.
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/shop"
              className="text-ink-muted hover:text-ink transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="text-ink-muted hover:text-ink transition-colors font-medium"
            >
              Collections
            </Link>
            <Link
              to="/inspiration"
              className="text-ink-muted hover:text-ink transition-colors font-medium"
            >
              Inspiration
            </Link>
            <Link
              to="/contact"
              className="text-ink-muted hover:text-ink transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/account"
                  className="text-ink-muted hover:text-ink transition-colors font-medium"
                >
                  {user?.firstName || 'Account'}
                </Link>
                {isAdmin() && (
                  <Link
                    to="/admin"
                    className="text-primary-dark hover:text-primary transition-colors font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-ink-muted hover:text-ink transition-colors font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-ink-muted hover:text-ink transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/shop"
                className="text-ink-muted hover:text-ink transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/collections"
                className="text-ink-muted hover:text-ink transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/inspiration"
                className="text-ink-muted hover:text-ink transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inspiration
              </Link>
              <Link
                to="/contact"
                className="text-ink-muted hover:text-ink transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="text-ink-muted hover:text-ink transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  {isAdmin() && (
                    <Link
                      to="/admin"
                      className="text-primary-dark hover:text-primary transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left text-ink-muted hover:text-ink transition-colors font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-ink-muted hover:text-ink transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-ink-muted hover:text-ink transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
