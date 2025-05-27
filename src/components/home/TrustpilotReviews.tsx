
import { useState, useEffect } from 'react';
import TrustpilotLogo from '../../assets/images/Trustpilotlogo.svg';
import trustpilotStars from '../../assets/images/trustpilot-stars-strip.svg';

const TrustpilotReviews = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Render different layouts based on screen size
  if (isMobile) {
    // Mobile layout
    return (
      <div className="w-full bg-gray-50 py-3">
        <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 text-xs">
                Our customers say
              </div>
              
              <div className="font-semibold text-sm">
                Excellent
              </div>
              
              <div className="flex items-center">
                <img src={trustpilotStars} alt="Trustpilot Stars" className="h-4 w-auto object-contain" />
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="text-gray-600 text-xs">
                4.5/5 (74,856 reviews)
              </div>
              
              <div className="flex items-center">
                <img src={TrustpilotLogo} alt="Trustpilot Logo" className="h-3 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (isTablet) {
    // Tablet layout
    return (
      <div className="w-full bg-gray-50 py-3">
        <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="text-gray-600 text-sm mr-4">
              Our customers say
            </div>
            
            <div className="flex items-center space-x-2 mr-4">
              <div className="font-semibold text-base mr-4">
                Excellent
              </div>
              
              <div className="flex items-center">
                <img src={trustpilotStars} alt="Trustpilot Stars" className="h-4 w-auto object-contain" />
              </div>
            </div>
            
            <div className="text-gray-600 text-sm mr-4">
              4.5 out of 5 based on 74,856 reviews
            </div>
            
            <div className="flex items-center">
                <img src={TrustpilotLogo} alt="Trustpilot Logo" className="h-3.5 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Desktop layout
    return (
      <div className="w-full h-[56px] bg-gray-50">
        <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
          <div className="flex items-center justify-center h-full py-3">
            <div className="text-gray-600 text-sm mr-2">
              Our customers say
            </div>
            
            <div className="font-semibold text-lg mr-4">
              Excellent
            </div>
            
            <div className="flex items-center mr-4">
              <img src={trustpilotStars} alt="Trustpilot Stars" className="h-5 w-auto object-contain" />
            </div>
            
            <div className="text-gray-600 text-sm mr-4">
              4.5 out of 5 based on 74,856 reviews
            </div>
            
            <div className="flex items-center">
              <img src={TrustpilotLogo} alt="Trustpilot Logo" className="h-4 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TrustpilotReviews;
