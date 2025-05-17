
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoImage from '../../assets/images/logo.webp';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Settings } from 'lucide-react';

interface NavItemProps {
  label: string;
  path: string;
}

const NavMenu: React.FC<{ items: NavItemProps[]; showBookTrial: boolean }> = ({ items, showBookTrial }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <div 
      className="absolute top-[20px]" 
      style={{ 
        top: '27px', 
        right: showBookTrial ? '250px' : '195px' 
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
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
    <header className="w-full h-[81.36px] bg-white border border-[#EDEDED] shadow-sm relative">
      <div className="max-w-[1440px] h-full mx-auto relative">
        {/* Logo */}
        <div className="absolute left-[69px] top-1/2 -translate-y-1/2">
          <Link to="/">
            <img 
              src={logoImage}
              alt="Elevate Yoga" 
              className="h-10"
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>
        
        {/* Navigation Menu - Same for all users */}
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
        <div className="absolute right-[30px] top-[20px] flex items-center space-x-4">
          {/* Book Trial Button - Only show when not logged in */}
          {!isAuthenticated && (
            <Link 
              to="/account/login" 
              className="w-[145px] h-[41px] flex justify-center items-center bg-[#121212] border border-[#121212] rounded-[8.55px]"
            >
              <span className="font-normal text-[15px] leading-[18px] text-white">Book a Free Trial</span>
            </Link>
          )}
          
          {/* Account Icon/Avatar with Dropdown */}
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-[41px] h-[41px] bg-[#F4F4F4] rounded-full flex items-center justify-center overflow-hidden focus:outline-none"
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
            <Link to="/account/login" className="w-[41px] h-[41px] bg-[#F4F4F4] rounded-full flex items-center justify-center">
              <svg className="w-[17px] h-[17px]" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 1.5C9.6 1.5 10.5 2.4 10.5 3.5C10.5 4.6 9.6 5.5 8.5 5.5C7.4 5.5 6.5 4.6 6.5 3.5C6.5 2.4 7.4 1.5 8.5 1.5Z" stroke="#121212" strokeWidth="1" />
                <path d="M14.5 15.5C14.5 12.2 11.8 9.5 8.5 9.5C5.2 9.5 2.5 12.2 2.5 15.5" stroke="#121212" strokeWidth="1" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header2;
