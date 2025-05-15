
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import video from '../../assets/videos/mixkit-morning-yoga-exercise-14869-hd-ready.mp4';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
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
    <div className="w-full h-[829px] bg-[#121212] rounded-b-[40px] pt-[141.36px]">
      <div className="max-w-[1440px] mx-auto relative">
        <div className="w-[1317px] h-[610px] mx-auto">
          {/* Left Content */}
          <div className="absolute w-[624px] h-[173px] left-[50px] top-[168px]">
            <h1 className="w-[637px] font-bold text-[59.83px] leading-[63px] text-center tracking-[-0.008em] capitalize text-white">
              Virtual Yoga Retreat<br />At Your Home!
            </h1>
            
            <p className="w-[584px] mt-6 font-normal text-[24px] text-center text-[#D2D1D1] mx-auto">
              Flexible. Impactful. Proven
            </p>
            
            <Link 
              to="/book-trial" 
              className="w-[286px] h-[62.81px] mt-10 mx-auto flex justify-center items-center bg-[#E32552] rounded-[10px] px-[36.8px] py-[18.4px]"
            >
              <span className="font-medium text-[21.47px] leading-[26px] text-white text-center">
                Book a Free Trial
              </span>
            </Link>
          </div>
          
          {/* Right Content - Video */}
          <div className="absolute w-[612px] h-[610px] right-[50px] top-0">
            <div className="w-full h-full rounded-[33.14px] overflow-hidden">
              <div className="w-[644.08px] h-[610px] bg-[#D9D9D9] rounded-[33.14px] relative">
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
                className="absolute w-[64px] h-[64px] left-[39px] top-[522px] backdrop-blur-[2.07px] cursor-pointer"
                onClick={togglePlayPause}
              >
                <div className="absolute w-[64px] h-[64px] left-0 top-0 bg-[rgba(255,255,255,0.43)] rounded-full"></div>
                <div className="absolute w-[29.87px] h-[29.87px] left-[17px] top-[17px] bg-[#E32552] rounded-[2.86px] flex items-center justify-center">
                  {isPlaying ? (
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
