import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Live Classes', href: '/live-classes' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact' }
];

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    // Check if current page is home page
    setIsHomePage(location.pathname === '/');

    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsSticky(window.scrollY > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const logoUrl = isSticky && isHomePage ? 
    "https://theelevateyoga.com/cdn/shop/files/8.png?v=1729424532" : 
    "https://theelevateyoga.com/cdn/shop/files/7.png?v=1729424512";

  return (
    <header className={`fixed w-full z-50 ${isSticky && isHomePage ? 'bg-white' : ''}`}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>
        
        <Link to="/" className="flex items-center">
          <img 
            src={logoUrl}
            alt="The Elevate Yoga"
            className="h-8"
          />
        </Link>

        <Link to="/account/login" className="text-gray-600 hover:text-gray-900">
          <User size={24} />
        </Link>
      </div>

      {/* Desktop Header */}
      <div className="header-alignment hidden lg:flex items-center justify-between px-8 py-4">
      <Link to="/" className="flex-shrink-0">
          <img 
            src={logoUrl}
            alt="The Elevate Yoga"
            className="h-10"
          />
        </Link>

        <nav className="flex-grow flex justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  to={item.href}
                  className={`${isSticky && isHomePage ? 'text-gray-700' : 'menuitem-color'} hover:text-gray-900 font-medium`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-6">
        <Link 
            to="/account/register" 
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Book A Free Trial
          </Link>
          <Link to="/account/login" className="text-gray-600 hover:text-gray-900">
            <User size={24} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <img 
                src={logoUrl} 
                alt="The Elevate Yoga"
                className="h-8"
              />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href}
                      className="block text-gray-700 hover:text-gray-900 py-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-4">
                <a 
                  href="/account/register" 
                  className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Book A Free Trial
                </a>
                <a 
                  href="/account/login" 
                  className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Log In
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Search our store</h3>
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              <form className="relative">
                <input
                  type="search"
                  placeholder="Search products"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 pr-12"
                />
                <button 
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Search size={20} className="text-gray-600" />
                </button>
              </form>
              <div className="mt-4">
                <span className="text-gray-600 mr-4">Popular Searches:</span>
                <div className="flex flex-wrap gap-4">
                  <a href="/search?q=yoga" className="text-gray-700 hover:text-gray-900 underline">
                    Yoga
                  </a>
                  <a href="/search?q=meditation" className="text-gray-700 hover:text-gray-900 underline">
                    Meditation
                  </a>
                  <a href="/search?q=classes" className="text-gray-700 hover:text-gray-900 underline">
                    Classes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;