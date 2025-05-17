

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
    <div className="w-full h-[60px] bg-[#E32552] relative">
      <div className="max-w-[1440px] h-full mx-auto relative">
        <div className="absolute w-[427px] h-[22px] left-1/2 -translate-x-1/2 -ml-[53.5px] top-1/2 -translate-y-1/2 font-bold text-[20px] leading-[21px] flex items-center justify-center text-white">
          {message}
        </div>
        
        <a 
          href={buttonLink} 
          onClick={handleClick}
          className="absolute w-[112px] h-[41.04px] right-[454px] top-1/2 -translate-y-1/2 flex justify-center items-center bg-white border border-[#121212] rounded-[8.55px]"
        >
          <span className="font-normal text-[15px] leading-[18px] text-[#121212]">{buttonText}</span>
        </a>
      </div>
    </div>
  );
};

export default PromoBanner;
