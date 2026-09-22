import { Link, useLocation } from 'react-router';
import { ShoppingCart, User, LogOut, LayoutDashboard, Droplet, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useState } from 'react';

export function Navbar() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = getCartCount();
  const isAdmin = user?.role === 'admin';
  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition-opacity"
            onClick={closeMobileMenu}
          >
            <Droplet className="h-7 w-7" />
            <span className="hidden sm:inline">AquaWell</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {!isAdminRoute ? (
              <>
                <Link to="/" className="hover:text-blue-100 transition-colors">
                  Home
                </Link>
                <Link to="/services" className="hover:text-blue-100 transition-colors">
                  Services
                </Link>
                <Link to="/about" className="hover:text-blue-100 transition-colors">
                  About
                </Link>
                <Link to="/contact" className="hover:text-blue-100 transition-colors">
                  Contact
                </Link>
              </>
            ) : (
              <Link to="/admin" className="hover:text-blue-100 transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {!isAdminRoute && user.role === 'customer' && (
                  <>
                    <Link to="/orders" className="hover:text-blue-100 transition-colors">
                      My Orders
                    </Link>
                    <Link to="/cart" className="relative hover:text-blue-100 transition-colors">
                      <ShoppingCart className="h-6 w-6" />
                      {cartCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 border-none">
                          {cartCount}
                        </Badge>
                      )}
                    </Link>
                  </>
                )}
                
                {isAdmin && !isAdminRoute && (
                  <Link to="/admin">
                    <Button variant="secondary" size="sm">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}

                {isAdminRoute && (
                  <Link to="/">
                    <Button variant="secondary" size="sm">
                      Back to Site
                    </Button>
                  </Link>
                )}

                {!isAdminRoute && (
                  <Link to="/profile">
                    <Button variant="secondary" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                )}

                <Button onClick={handleLogout} variant="secondary" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex flex-col gap-3">
              {!isAdminRoute ? (
                <>
                  <Link
                    to="/"
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                  <Link
                    to="/services"
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Services
                  </Link>
                  <Link
                    to="/about"
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <Link
                  to="/admin"
                  className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}

              {user ? (
                <>
                  {!isAdminRoute && user.role === 'customer' && (
                    <>
                      <Link
                        to="/orders"
                        className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/cart"
                        className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-between"
                        onClick={closeMobileMenu}
                      >
                        <span className="flex items-center gap-2">
                          <ShoppingCart className="h-5 w-5" />
                          Cart
                        </span>
                        {cartCount > 0 && (
                          <Badge className="bg-red-500 border-none">
                            {cartCount}
                          </Badge>
                        )}
                      </Link>
                    </>
                  )}

                  {isAdmin && !isAdminRoute && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                      onClick={closeMobileMenu}
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      Admin Panel
                    </Link>
                  )}

                  {isAdminRoute && (
                    <Link
                      to="/"
                      className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                      onClick={closeMobileMenu}
                    >
                      Back to Site
                    </Link>
                  )}

                  {!isAdminRoute && (
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
                      onClick={closeMobileMenu}
                    >
                      <User className="h-5 w-5" />
                      Profile
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2 text-left"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}