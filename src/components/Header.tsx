import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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

interface UserData {
  name: string;
  email: string;
}

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check for user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const logoUrl = isHomePage 
    ? "https://theelevateyoga.com/cdn/shop/files/7.png?v=1729424512"
    : "https://theelevateyoga.com/cdn/shop/files/8.png?v=1729424512";

  const headerClasses = isHomePage 
    ? "absolute top-0 left-0 w-full z-50"
    : "w-full z-50 bg-white shadow-sm";

  const textColor = isHomePage ? "text-white" : "text-gray-600";
  const hoverColor = isHomePage ? "hover:text-teal-200" : "hover:text-teal-600";
  const borderColor = isHomePage ? "border-white" : "border-gray-600";
  const buttonHoverBg = isHomePage ? "hover:bg-white hover:text-teal-900" : "hover:bg-teal-600 hover:text-white";

  return (
    <header className={headerClasses}>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`${textColor} ${hoverColor}`}
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

        <Link to="/account/login" className={`${textColor} ${hoverColor}`}>
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
                  className={`${textColor} ${hoverColor} transition-colors`}
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
            className={`bg-transparent ${textColor} border-2 ${borderColor} px-6 py-2 rounded-full ${buttonHoverBg} transition-colors`}
          >
            Book A Free Trial
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className={textColor}>{user?.name || userRole}</span>
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className={`${textColor} ${hoverColor} flex items-center`}
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/account/login" className={`${textColor} ${hoverColor}`}>
              <User size={24} />
            </Link>
          )}
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
                    <Link 
                      to={item.href}
                      className="block text-gray-700 hover:text-gray-900 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-4">
                <Link 
                  to="/account/register" 
                  className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book A Free Trial
                </Link>
                {isAuthenticated ? (
                  <>
                    <span className="block text-center text-gray-700">{user?.name || userRole}</span>
                    <button 
                      onClick={() => {
                        logout();
                        navigate('/');
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/account/login" 
                    className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log In
                  </Link>
                )}
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
                  <Link to="/search?q=yoga" className="text-gray-700 hover:text-gray-900 underline">
                    Yoga
                  </Link>
                  <Link to="/search?q=meditation" className="text-gray-700 hover:text-gray-900 underline">
                    Meditation
                  </Link>
                  <Link to="/search?q=classes" className="text-gray-700 hover:text-gray-900 underline">
                    Classes
                  </Link>
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