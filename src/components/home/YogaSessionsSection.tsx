import { useState, useRef, useEffect } from 'react';
import session1 from '../../assets/images/one_session.png';
import session2 from '../../assets/images/one_session_2.png';
import session3 from '../../assets/images/one_session_3.png';

const YogaSessionsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start with middle slide active
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Check if viewport is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Session data
  const sessions = [
    {
      id: 1,
      title: 'Daily Sessions',
      instructor: 'Aishwarya Mondody',
      description: 'Start your day with energizing yoga routines designed for daily practice.',
      image: session1,
    },
    {
      id: 2,
      title: '1:1 Sessions',
      instructor: 'Aishwarya Mondody',
      description: 'Personalized yoga sessions tailored to your specific needs and goals.',
      image: session2,
    },
    {
      id: 3,
      title: 'Group Classes',
      instructor: 'Aishwarya Mondody',
      description: 'Join our community sessions for a shared yoga experience with expert guidance.',
      image: session3,
    }
  ];

  // Handle touch events for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      nextSlide();
    }

    if (touchEnd - touchStart > 75) {
      // Swiped right
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sessions.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sessions.length - 1 : prev - 1));
  };

  return (
    <section className="w-full bg-[#121212] py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Section Title */}
      <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0 mb-10 md:mb-14 lg:mb-16 text-center">
        <h2 className="font-inter font-medium text-[32px] leading-[1.3] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[52px] lg:leading-[76px] text-white">
          Flexible, Impactful, Proven!
        </h2>
      </div>
      
      {/* Slider Container - Full width with overflow visible */}
      <div className="relative w-full overflow-hidden">
        {/* This wrapper ensures the slider goes edge-to-edge */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Slider Track */}
          <div 
            ref={sliderRef}
            className="flex items-center justify-center h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] relative px-2 xs:px-4 sm:px-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Slide - Partially visible on left edge */}
            <div 
              className="absolute overflow-hidden transition-all duration-500 ease-in-out opacity-70 z-10"
              style={{
                width: isMobile ? '90%' : '948px',
                height: 'auto',
                left: isMobile ? '10%' : '200px',
                transform: isMobile ? 'translateX(-95%)' : 'translateX(-75%)',
                borderRadius: '16px',
                display: isMobile ? 'none' : 'block' // Hide on mobile to simplify view
              }}
            >
              <img 
                src={sessions[(currentSlide === 0 ? sessions.length - 1 : currentSlide - 1)].image} 
                alt="Previous slide" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="font-inter font-medium text-[22px] md:text-[28px] mb-2 text-center">
                  {sessions[(currentSlide === 0 ? sessions.length - 1 : currentSlide - 1)].title}
                </h3>
                <p className="text-center max-w-[85%] text-[14px] md:text-[16px] font-light leading-relaxed">
                  {sessions[(currentSlide === 0 ? sessions.length - 1 : currentSlide - 1)].description}
                </p>
              </div>
            </div>
            
            {/* Center Slide - Fully visible */}
            <div 
              className="absolute overflow-hidden transition-all duration-500 ease-in-out z-20"
              style={{
                width: isMobile ? '90%' : '948px',
                maxWidth: '948px',
                height: 'auto',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
                borderRadius: '16px',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img 
                src={sessions[currentSlide].image} 
                alt="Current slide" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 text-white">
                <h3 className="font-inter font-medium text-[22px] md:text-[28px] mb-2 text-center">
                  {sessions[currentSlide].title}
                </h3>
                <p className="text-center max-w-[85%] text-[14px] md:text-[16px] font-light leading-relaxed">
                  {sessions[currentSlide].description}
                </p>
              </div>
            </div>
            
            {/* Right Slide - Partially visible on right edge */}
            <div 
              className="absolute overflow-hidden transition-all duration-500 ease-in-out opacity-70 z-10"
              style={{
                width: isMobile ? '90%' : '948px',
                height: 'auto',
                right: isMobile ? '10%' : '200px',
                transform: isMobile ? 'translateX(95%)' : 'translateX(75%)',
                borderRadius: '16px',
                display: isMobile ? 'none' : 'block' // Hide on mobile to simplify view
              }}
            >
              <img 
                src={sessions[(currentSlide === sessions.length - 1 ? 0 : currentSlide + 1)].image} 
                alt="Next slide" 
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 text-white">
                <h3 className="font-inter font-medium text-[22px] md:text-[28px] mb-2 text-center">
                  {sessions[(currentSlide === sessions.length - 1 ? 0 : currentSlide + 1)].title}
                </h3>
                <p className="text-center max-w-[85%] text-[14px] md:text-[16px] font-light leading-relaxed">
                  {sessions[(currentSlide === sessions.length - 1 ? 0 : currentSlide + 1)].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-center mt-4 xs:mt-6 sm:mt-8 space-x-3 xs:space-x-4 sm:space-x-6 relative z-30">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center hover:bg-opacity-30 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default YogaSessionsSection;