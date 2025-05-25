import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../../assets/images/logo.webp';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Settings, X } from 'lucide-react';
import PromoBanner from './PromoBanner';

interface NavItemProps {
  label: string;
  path: string;
}

const NavMenu: React.FC<{ items: NavItemProps[]; showBookTrial: boolean; isMobile?: boolean; onItemClick?: () => void }> = ({ items, showBookTrial, isMobile = false, onItemClick }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  if (isMobile) {
    return (
      <div className="w-full py-4">
        <div className="flex flex-col space-y-8 px-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="relative"
            >
              <Link 
                to={item.path} 
                className="font-normal text-[16px] leading-[21px] text-[#121212] uppercase block py-2"
                onClick={onItemClick}
              >
                {item.label}
              </Link>
              {/* Active indicator line */}
              {location.pathname.includes(item.path) && (
                <div className="absolute w-full h-[2px] left-0 bottom-[-2px] bg-[#121212] rounded-[10px]"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className="absolute top-[20px] hidden lg:block" 
      style={{ 
        top: '27px', 
        right: showBookTrial ? '20%' : '5%' 
      }}>
      <div className="relative flex items-center space-x-5">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="relative"
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link 
              to={item.path} 
              className="font-normal text-[15px] leading-[21px] text-[#121212] uppercase"
            >
              {item.label}
            </Link>
            {/* Active/hover indicator line */}
            {(location.pathname.includes(item.path) || hoveredItem === item.path) && (
              <div className="absolute w-full h-[2px] left-0 bottom-[-8px] bg-[#121212] rounded-[10px]"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Header2 = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  
  // Handle scroll to show/hide promo banner - only on homepage
  useEffect(() => {
    const controlBanner = () => {
      // Only apply scroll behavior on homepage
      if (window.location.pathname !== '/') {
        return;
      }
      
      // Get current scroll position
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - show promo banner, hide header
        setShowPromoBanner(true);
      } else {
        // Scrolling up - hide promo banner, show header
        setShowPromoBanner(false);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', controlBanner);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', controlBanner);
    };
  }, [lastScrollY]);
  
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Get user info from localStorage if authenticated
  const getUserInfo = () => {
    if (!isAuthenticated) return null;
    
    try {
      const userString = localStorage.getItem('user');      
      if (userString) {
        return JSON.parse(userString);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    return null;
  };
  
  const user = getUserInfo();
  const userInitials = user?.first_name && user?.last_name 
    ? `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
    : user?.first_name
    ? user.first_name.substring(0, 2).toUpperCase()
    : 'ST';
    
  return (
    <>
      {/* Promo Banner - Shows when scrolling down */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${showPromoBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <PromoBanner 
          message="Join Group Sessions Monthly Unlimited!" 
          buttonText="Buy Now" 
          buttonLink="#yogaPlansSection" 
        />
      </div>
      
      {/* Header - Always visible when scrolling up, hidden when scrolling down */}
      <header className={`w-full h-[81.36px] bg-white border border-[#EDEDED] shadow-sm fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${showPromoBanner ? 'opacity-0 pointer-events-none' : 'opacity-100 z-30'}`}>
        <div className="w-full max-w-[1224px] h-full mx-auto relative">
          {/* Mobile Header Layout */}
          {isMobile ? (
            <>
            <div className="flex items-center justify-between h-full sm:px-6 lg:px-8">
              <div className="flex items-center space-x-4">
                {/* Left: Hamburger Menu */}
                <button 
                  className="w-[41px] h-[41px] flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X size={20} className="text-[#121212]" />
                  ) : (
                    <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.875 0.166748H24.125V2.75008H0.875V0.166748ZM0.875 9.20842H16.375V11.7917H0.875V9.20842ZM0.875 18.2501H24.125V20.8334H0.875V18.2501Z" fill="#121212"/>
                    </svg>
                  )}
                </button>
                <Link to="/">
                  <img 
                    src={logoImage}
                    alt="Elevate Yoga" 
                    className="h-8 sm:h-10"
                    style={{ objectFit: 'contain' }}
                  />
                </Link>
              </div>
              </div>
              {/* Center: Logo */}
              
            </>
          ) : (
            /* Desktop Logo */
            <div className="absolute top-1/2 -translate-y-1/2">
              <Link to="/">
                <img 
                  src={logoImage}
                  alt="Elevate Yoga" 
                  className="h-8 sm:h-10"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </div>
          )}
          
          {/* Desktop Navigation Menu */}
          <NavMenu 
            items={[
              { label: 'GROUP CLASSES', path: '/groupclasses' },
              { label: 'ONE ON ONE', path: '/one-on-one' },
              { label: 'ABOUT US', path: '/about-us' },
              { label: 'FAQS', path: '/faqs' }
            ]}
            showBookTrial={!isAuthenticated}
          />
          
          {/* Right side elements container */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center space-x-3 sm:space-x-4">
            {/* Book Trial Button - Mobile version (black button with white text) */}
            {!isAuthenticated && isMobile && (
              <Link 
                to="/account/login" 
                className="flex w-[145px] h-[41px] justify-center items-center bg-[#121212] border border-[#121212] rounded-xl"
              >
                <span className="font-medium text-[14px] leading-[18px] text-white whitespace-nowrap">Book a Free Trial</span>
              </Link>
            )}
            
            {/* Book Trial Button - Desktop version (black button with white text) */}
            {!isAuthenticated && !isMobile && (
              <Link 
                to="/account/login" 
                className="flex w-[120px] md:w-[145px] lg:w-[160px] h-[41px] justify-center items-center bg-[#121212] border border-[#121212] rounded-[8.55px]"
              >
                <span className="font-normal text-[14px] sm:text-[15px] leading-[18px] text-white whitespace-nowrap">Book a Free Trial</span>
              </Link>
            )}
            
            {/* Account Icon/Avatar with Dropdown */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`w-[41px] h-[41px] ${isMobile ? 'bg-white' : 'bg-[#F4F4F4]'} rounded-full flex items-center justify-center overflow-hidden focus:outline-none`}
                >
                  {user?.profilePhoto ? (
                    <img 
                      src={user.profilePhoto} 
                      alt="User Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#121212] text-white font-medium text-sm">
                      {userInitials}
                    </div>
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-[#EDEDED]">
                    <div className="px-4 py-2 border-b border-[#EDEDED]">
                      <p className="text-sm font-medium text-[#121212]">{user?.first_name} {user?.last_name}</p>
                      <p className="text-xs text-gray-500 truncate">{userRole}</p>
                    </div>
                    
                    <Link 
                      to="/account/profile" 
                      className="flex items-center px-4 py-2 text-sm text-[#121212] hover:bg-[#F4F4F4] w-full text-left"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      My Profile
                    </Link>
                    
                    <Link 
                      to="/account/settings" 
                      className="flex items-center px-4 py-2 text-sm text-[#121212] hover:bg-[#F4F4F4] w-full text-left"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Account Settings
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-sm text-[#121212] hover:bg-[#F4F4F4] w-full text-left"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/account/login" className={`w-[41px] h-[41px] ${isMobile ? 'bg-white' : 'bg-[#F4F4F4]'} rounded-full flex items-center justify-center`}>
                <svg className="w-[17px] h-[17px]" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 1.5C9.6 1.5 10.5 2.4 10.5 3.5C10.5 4.6 9.6 5.5 8.5 5.5C7.4 5.5 6.5 4.6 6.5 3.5C6.5 2.4 7.4 1.5 8.5 1.5Z" stroke="#121212" strokeWidth="1" />
                  <path d="M14.5 15.5C14.5 12.2 11.8 9.5 8.5 9.5C5.2 9.5 2.5 12.2 2.5 15.5" stroke="#121212" strokeWidth="1" />
                </svg>
              </Link>
            )}
            
            {/* Mobile Menu Button - Removed as it's now on the left */}
          </div>
          
          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && isMobile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}></div>
          )}
          
          {/* Mobile Menu */}
          {isMobile && (
            <div 
              ref={mobileMenuRef}
              className={`fixed top-[81.36px] right-0 w-full bg-white h-[calc(100vh-81.36px)] z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
              <div className="pt-8 pb-4 flex flex-col h-full">
                {/* Mobile Navigation */}
                <NavMenu 
                  items={[
                    { label: 'GROUP CLASSES', path: '/groupclasses' },
                    { label: 'ONE ON ONE', path: '/one-on-one' },
                    { label: 'ABOUT US', path: '/about-us' },
                    { label: 'FAQS', path: '/faqs' }
                  ]}
                  showBookTrial={false}
                  isMobile={true}
                  onItemClick={closeMobileMenu}
                />
                
                {/* Mobile User Account Section */}
                {isAuthenticated && (
                  <div className="mt-8 border-t border-[#EDEDED] pt-6 px-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-[41px] h-[41px] bg-white rounded-full flex items-center justify-center overflow-hidden">
                        {user?.profilePhoto ? (
                          <img 
                            src={user.profilePhoto} 
                            alt="User Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#121212] text-white font-medium text-sm">
                            {userInitials}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#121212]">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-gray-500 truncate">{userRole}</p>
                      </div>
                    </div>
                    
                    <Link 
                      to="/account/profile" 
                      className="flex items-center py-3 text-sm text-[#121212] w-full"
                      onClick={closeMobileMenu}
                    >
                      <User size={16} className="mr-3" />
                      My Profile
                    </Link>
                    
                    <Link 
                      to="/account/settings" 
                      className="flex items-center py-3 text-sm text-[#121212] w-full"
                      onClick={closeMobileMenu}
                    >
                      <Settings size={16} className="mr-3" />
                      Account Settings
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center py-3 text-sm text-[#121212] w-full"
                    >
                      <LogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-[81.36px]"></div>
    </>
  );
};

export default Header2;