import React, { useState } from 'react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-gray-600 hover:text-gray-900"
        >
          <Menu size={24} />
        </button>
        
        <a href="/" className="flex items-center">
          <img 
            src="https://theelevateyoga.com/cdn/shop/files/7.png?v=1729424512" 
            alt="The Elevate Yoga"
            className="h-8"
          />
        </a>

        <button className="text-gray-600 hover:text-gray-900">
          <User size={24} />
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-8 py-4">
        <a href="/" className="flex-shrink-0">
          <img 
            src="https://theelevateyoga.com/cdn/shop/files/8.png?v=1729424532" 
            alt="The Elevate Yoga"
            className="h-10"
          />
        </a>

        <nav className="flex-grow flex justify-center">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center space-x-6">
          <a 
            href="/account/register" 
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Book A Free Trial
          </a>
          <a href="/account" className="text-gray-600 hover:text-gray-900">
            <User size={24} />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b flex justify-between items-center">
              <img 
                src="https://theelevateyoga.com/cdn/shop/files/7.png?v=1729424512" 
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