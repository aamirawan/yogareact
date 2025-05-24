

import { useState, useEffect } from 'react';

interface PromoBannerProps {
  message: string;
  buttonText: string;
  buttonLink: string;
  scrollToSection?: string;
}

const PromoBanner = ({ 
  message = "Join Group Sessions Monthly Unlimited!", 
  buttonText = "Buy Now", 
  buttonLink = "#", 
  scrollToSection = "yogaPlansSection"
}: Partial<PromoBannerProps>) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If we're not on the homepage, use the regular link behavior
    if (window.location.pathname !== '/') {
      return;
    }
    
    // Prevent default link behavior if we're on the homepage
    e.preventDefault();
    
    // Find the section to scroll to
    const sectionElement = document.getElementById(scrollToSection);
    
    if (sectionElement) {
      // Scroll to the section with smooth behavior
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If section not found, fallback to the link
      window.location.href = buttonLink;
    }
  };
  
  return (
    <div className="w-full h-[60px] sm:h-[60px] bg-[#E32552] relative">
      <div className="max-w-[1440px] h-full mx-auto relative px-4 sm:px-6 lg:px-8">
        {isMobile ? (
          // Mobile layout - stacked vertically
          <div className="flex flex-col h-full justify-center items-center py-2">
            <div className="text-white font-bold text-[14px] sm:text-[16px] md:text-[20px] leading-tight text-center mb-1">
              {message}
            </div>
            
            <a 
              href={buttonLink} 
              onClick={handleClick}
              className="w-[100px] h-[30px] flex justify-center items-center bg-white border border-[#121212] rounded-[6px] sm:rounded-[8.55px]"
            >
              <span className="font-normal text-[13px] leading-[16px] text-[#121212]">{buttonText}</span>
            </a>
          </div>
        ) : (
          // Desktop layout - side by side
          <>
            <div className="absolute w-auto max-w-[80%] md:max-w-[60%] lg:max-w-[427px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-bold text-[16px] md:text-[18px] lg:text-[20px] leading-tight flex items-center justify-center text-white text-center">
              {message}
            </div>
            
            <a 
              href={buttonLink} 
              onClick={handleClick}
              className="absolute w-[100px] sm:w-[112px] h-[36px] sm:h-[41.04px] right-4 sm:right-6 md:right-8 lg:right-[60px] xl:right-[390px] top-1/2 -translate-y-1/2 flex justify-center items-center bg-white border border-[#121212] rounded-[8.55px]"
            >
              <span className="font-normal text-[14px] sm:text-[15px] leading-[18px] text-[#121212]">{buttonText}</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default PromoBanner;
