
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import video from '../../assets/videos/mixkit-morning-yoga-exercise-14869-hd-ready.mp4';
import { useAuth } from '../../context/AuthContext';

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check authentication status on mount and when isAuthenticated changes
  useEffect(() => {
    // Check for token in localStorage as a more reliable method
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [isAuthenticated]);
  
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
  
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div className="w-full bg-[#121212] rounded-b-[20px] sm:rounded-b-[30px] md:rounded-b-[40px] pt-[80px] sm:pt-[100px] md:pt-[120px] lg:pt-[80px] pb-10 md:pb-16 lg:pb-0 min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-[829px]">

      
      <div className="max-w-[1224px] mx-auto relative px-4 sm:px-5 md:px-6 lg:px-0">
        {isMobile ? (
          // Mobile layout - stacked vertically
          <div className="flex flex-col items-center">
            {/* Content */}
            <div className="w-full text-center mb-8">
              <h1 className="font-bold text-[32px] sm:text-[40px] lg:text-[56.83px] leading-[1.1] tracking-[-0.008em] capitalize text-white px-2">
                Virtual Yoga Retreat<br />At Your Home!
              </h1>
              
              <p className="mt-4 font-normal text-[16px] sm:text-[18px] text-center text-[#D2D1D1] max-w-[90%] mx-auto">
                Flexible. Impactful. Proven
              </p>
              
              <Link 
                to={isLoggedIn ? "/account/login" : "/account/subscription"} 
                className={`${isLoggedIn ? 'w-[220px]' : 'w-[180px]'} h-[50px] mt-6 mx-auto flex justify-center items-center bg-[#E32552] rounded-[8px] px-6 py-3`}
              >
                <span className="font-medium text-[16px] leading-[24px] text-white text-center">
                  {isLoggedIn ? "Book a Free Trial" : "Subscribe"}
                </span>
              </Link>
            </div>
            
            {/* Video */}
            <div className="w-full max-w-[90%] aspect-video rounded-[15px] overflow-hidden">
              <div className="w-full h-full bg-[#D9D9D9] rounded-[15px] relative">
                <video
                  ref={videoRef}
                  className="absolute w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-[rgba(75,74,74,0.2)] bg-blend-multiply"></div>
                
                {/* Play/Pause button overlay */}
                <div 
                  className="absolute w-[40px] h-[40px] left-[15px] bottom-[15px] backdrop-blur-[2px] cursor-pointer"
                  onClick={togglePlayPause}
                >
                  <div className="absolute w-full h-full left-0 top-0 bg-[rgba(255,255,255,0.43)] rounded-full"></div>
                  <div className="absolute w-[20px] h-[20px] left-[10px] top-[10px] bg-[#E32552] rounded-[2px] flex items-center justify-center">
                    {isPlaying ? (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : isTablet ? (
          // Tablet layout - modified side by side
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-4">
            {/* Left Content */}
            <div className="w-full md:w-[45%] text-center md:text-left">
              <h1 className="font-bold text-[40px] md:text-[48px] lg:text-[56.83px] leading-[1.1] tracking-[-0.008em] capitalize text-white">
                Virtual Yoga Retreat<br />At Your Home!
              </h1>
              
              <p className="mt-4 md:mt-5 font-normal text-[18px] md:text-[20px] text-center md:text-left text-[#D2D1D1]">
                Flexible. Impactful. Proven
              </p>
              
              <Link 
                to={isLoggedIn ? "/account/login" : "/account/subscription"} 
                className={`${isLoggedIn ? 'w-[220px]' : 'w-[180px]'} h-[50px] mt-6 md:mt-8 mx-auto md:mx-0 flex justify-center items-center bg-[#E32552] rounded-[8px] px-6 py-3`}
              >
                <span className="font-medium text-[16px] md:text-[18px] leading-[24px] text-white text-center">
                  {isLoggedIn ? "Book a Free Trial" : "Subscribe"}
                </span>
              </Link>
            </div>
            
            {/* Right Content - Video */}
            <div className="w-full md:w-[50%] aspect-video md:h-[400px] rounded-[20px] overflow-hidden">
              <div className="w-full h-full bg-[#D9D9D9] rounded-[20px] relative">
                <video
                  ref={videoRef}
                  className="absolute w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-[rgba(75,74,74,0.2)] bg-blend-multiply"></div>
                
                {/* Play/Pause button overlay */}
                <div 
                  className="absolute w-[50px] h-[50px] left-[20px] bottom-[20px] backdrop-blur-[2px] cursor-pointer"
                  onClick={togglePlayPause}
                >
                  <div className="absolute w-full h-full left-0 top-0 bg-[rgba(255,255,255,0.43)] rounded-full"></div>
                  <div className="absolute w-[24px] h-[24px] left-[13px] top-[13px] bg-[#E32552] rounded-[2px] flex items-center justify-center">
                    {isPlaying ? (
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout - original side by side with responsive adjustments
          <div className="relative h-[610px]">
            {/* Left Content */}
            <div className="absolute w-[45%] lg:w-[550px] left-0 top-[100px] lg:top-[168px]">
              <h1 className="w-full lg:w-[550px] font-bold text-[48px] lg:text-[56.83px] leading-[1.1] lg:leading-[63px] text-center tracking-[-0.008em] capitalize text-white">
                Virtual Yoga Retreat<br />At Your Home!
              </h1>
              
              <p className="w-full lg:w-[500px] mt-5 lg:mt-6 font-normal text-[20px] lg:text-[24px] text-center text-[#D2D1D1] mx-auto">
                Flexible. Impactful. Proven
              </p>
              
              <Link 
                to={isLoggedIn ? "/account/login" : "/account/subscription"} 
                className={`${isLoggedIn ? 'w-[240px] lg:w-[286px]' : 'w-[200px] lg:w-[220px]'} h-[55px] lg:h-[62.81px] mt-8 lg:mt-10 mx-auto flex justify-center items-center bg-[#E32552] rounded-[10px] px-[30px] lg:px-[36.8px] py-[16px] lg:py-[18.4px]`}
              >
                <span className="font-medium text-[18px] lg:text-[21.47px] leading-[26px] text-white text-center">
                  {isLoggedIn ? "Book a Free Trial" : "Subscribe"}
                </span>
              </Link>
            </div>
            
            {/* Right Content - Video */}
            <div className="absolute w-[50%] lg:w-[550px] h-[500px] lg:h-[610px] right-0 top-0">
              <div className="w-full h-full rounded-[25px] lg:rounded-[33.14px] overflow-hidden">
                <div className="w-full h-full bg-[#D9D9D9] rounded-[25px] lg:rounded-[33.14px] relative">
                  <video
                    ref={videoRef}
                    className="absolute w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-[rgba(75,74,74,0.2)] bg-blend-multiply"></div>
                </div>
                
                {/* Play/Pause button overlay */}
                <div 
                  className="absolute w-[55px] lg:w-[64px] h-[55px] lg:h-[64px] left-[30px] lg:left-[39px] bottom-[30px] lg:top-[522px] backdrop-blur-[2.07px] cursor-pointer"
                  onClick={togglePlayPause}
                >
                  <div className="absolute w-full h-full left-0 top-0 bg-[rgba(255,255,255,0.43)] rounded-full"></div>
                  <div className="absolute w-[26px] lg:w-[29.87px] h-[26px] lg:h-[29.87px] left-[14.5px] lg:left-[17px] top-[14.5px] lg:top-[17px] bg-[#E32552] rounded-[2.86px] flex items-center justify-center">
                    {isPlaying ? (
                      <svg className="w-5 lg:w-6 h-5 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg className="w-5 lg:w-6 h-5 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
