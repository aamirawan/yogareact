// Yoga Retreat Experience Section component
import { useState, useRef } from "react";
import fullStar from "../../assets/images/Star_icon.svg";
import halfStar from "../../assets/images/Half-star.svg";
import TrustpilotLogo from "../../assets/images/Trustpilotlogo.svg";

const YogaRetreatExperienceSection = () => {
  // State to track active review index
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const totalReviews = 3; // Total number of reviews
  
  // Reference to the carousel container
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextReview();
    } else if (isRightSwipe) {
      prevReview();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Navigation functions for carousel
  const nextReview = () => {
    if (activeReviewIndex < totalReviews - 1) {
      setActiveReviewIndex(activeReviewIndex + 1);
      scrollToReview(activeReviewIndex + 1);
    } else {
      // Loop back to the first review
      setActiveReviewIndex(0);
      scrollToReview(0);
    }
  };

  const prevReview = () => {
    if (activeReviewIndex > 0) {
      setActiveReviewIndex(activeReviewIndex - 1);
      scrollToReview(activeReviewIndex - 1);
    } else {
      // Loop to the last review
      setActiveReviewIndex(totalReviews - 1);
      scrollToReview(totalReviews - 1);
    }
  };

  // Function to scroll to a specific review
  const scrollToReview = (index: number) => {
    if (carouselRef.current) {
      const reviewCards = carouselRef.current.querySelectorAll('.review-card');
      if (reviewCards[index]) {
        reviewCards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <section className="py-16 md:py-24 w-full bg-white">
      <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0 flex flex-col items-center">
        {/* Section Title */}
        <h2 className="font-inter font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-tight md:leading-[76px] text-center text-[#121212] max-w-full md:max-w-4xl mb-6 md:mb-10">
          Yoga Retreat Like Experience<br className="hidden sm:block" />
          Anytime, Anywhere!
        </h2>
        
        {/* Section Description */}
        <p className="font-inter font-normal text-base md:text-lg lg:text-[18px] leading-normal md:leading-[23px] text-center text-[#121212] max-w-xs sm:max-w-md md:max-w-lg mb-10 md:mb-16">
          Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
        </p>
        
        {/* Session Type Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-xs sm:max-w-xl justify-center mb-12 md:mb-20">
          <button className="w-full sm:w-[180px] h-[50px] bg-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] leading-[24px] text-white">
            1:1 Sessions
          </button>
          <button className="w-full sm:w-[180px] h-[50px] bg-white border border-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] leading-[24px] text-[#121212]">
            Daily Sessions
          </button>
          <button className="w-full sm:w-[180px] h-[50px] bg-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] leading-[24px] text-white">
            Group Classes
          </button>
        </div>
        
        {/* Trustpilot Reviews Section */}
        <div className="relative w-full py-8 overflow-hidden bg-white">
          <div className="relative max-w-[1239px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Trustpilot logo and rating section */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
              {/* Left section with Excellent rating */}
              <div className="flex flex-col items-center md:items-start">
                <h2 className="font-inter font-medium text-[26px] leading-8 text-[#121212] mb-4">Excellent</h2>
                
                {/* Trustpilot stars */}
                <div className="flex mb-3">
                  {/* Full stars */}
                  <div className="mr-[2px]" style={{ width: '25px', height: '23.5px' }}>
                    <img className="w-full" src={fullStar} alt="Full Star" />  
                  </div>
                  <div className="mr-[2px]" style={{ width: '25px', height: '23.5px' }}>
                    <img className="w-full" src={fullStar} alt="Full Star" />
                  </div>
                  <div className="mr-[2px]" style={{ width: '25px', height: '23.5px' }}>
                    <img className="w-full" src={fullStar} alt="Full Star" />
                  </div>
                  <div className="mr-[2px]" style={{ width: '25px', height: '23.5px' }}>
                    <img className="w-full" src={fullStar} alt="Full Star" />
                  </div>
                  {/* Half star */} 
                  <div style={{ width: '25px', height: '23.5px' }}>
                    <img src={halfStar} alt="Half Star" />
                  </div>
                </div>
                
                {/* Review count */}
                <p className="font-inter font-normal text-[12px] leading-[15px] text-[#A0A0A0] mb-4">Based on 74,90908 reviews</p>
                
                {/* Trustpilot logo */}
                <div className="flex items-center">
                  <div className="flex">
                    <img src={TrustpilotLogo} alt="Trustpilot Logo" />
                  </div>
                </div>
              </div>
              
              {/* Reviews carousel */}
              <div 
                ref={carouselRef}
                className="flex flex-row gap-4 md:gap-[60px] w-full md:w-auto overflow-x-auto pb-4 md:ml-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Review 1 */}
                <div className="review-card min-w-[85%] sm:min-w-[250px] md:min-w-[190px] flex-shrink-0 bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md snap-center">
                  {/* Trustpilot stars and verified badge */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {/* Full stars */}
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      {/* Half star */}
                      <div className="" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={halfStar} alt="Half Star" />
                      </div>
                    </div>
                    
                    {/* Verified badge */}
                    <div className="flex items-center ml-4">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 7.5L7.5 9.5L11 6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="ml-1 font-inter font-normal text-[14px] leading-[17px] text-[#545454]">Verified</span>
                    </div>
                  </div>
                  
                  {/* Review content */}
                  <h3 className="font-inter font-medium text-[14px] leading-[17px] text-[#121212] mb-2">Love your products</h3>
                  <p className="font-inter font-normal text-[12px] leading-[15px] text-[#A0A0A0] mb-2">Love your products</p>
                  <p className="font-inter font-normal text-[12px] leading-[15px] text-[#121212] mb-4">Jane, 1 hour ago</p>
                  <p className="font-inter font-normal text-[14px] leading-[17px] text-[#A0A0A0]">Showing our 5 star reviews</p>
                </div>
                
                {/* Review 2 */}
                <div className="review-card min-w-[85%] sm:min-w-[250px] md:min-w-[190px] flex-shrink-0 bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md snap-center">
                  {/* Trustpilot stars and verified badge */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {/* Full stars */}
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      {/* Half star */}
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>  
                        <img src={halfStar} alt="Half Star" />
                      </div>
                    </div>
                    
                    {/* Verified badge */}
                    <div className="flex items-center ml-4">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 7.5L7.5 9.5L11 6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="ml-1 font-inter font-normal text-[14px] leading-[17px] text-[#545454]">Verified</span>
                    </div>
                  </div>
                  
                  {/* Review content */}
                  <h3 className="font-inter font-medium text-[14px] leading-[17px] text-[#121212] mb-2">Love your products</h3>
                  <p className="font-inter font-normal text-[12px] leading-[15px] text-[#A0A0A0] mb-2">Quick resolution customer services</p>
                  <p className="font-inter font-normal text-[12px] leading-[15px] text-[#121212] mb-4">Jane, 1 hour ago</p>
                  <p className="font-inter font-normal text-[14px] leading-[17px] text-[#A0A0A0]">Showing our 5 star reviews</p>
                </div>
                
                {/* Review 3 */}
                <div className="review-card min-w-[85%] sm:min-w-[250px] md:min-w-[190px] flex-shrink-0 bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md snap-center">
                  {/* Trustpilot stars and verified badge */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {/* Full stars */}
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={fullStar} alt="Full Star" />
                      </div>
                      {/* Half star */}
                      <div className="mr-[2px]" style={{ width: '13.9px', height: '13.07px' }}>
                        <img src={halfStar} alt="Half Star" />
                      </div>
                    </div>
                    
                    {/* Verified badge */}
                    <div className="flex items-center ml-4">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.5 7.5L7.5 9.5L11 6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="ml-1 font-inter font-normal text-[14px] leading-[17px] text-[#545454]">Verified</span>
                    </div>
                  </div>
                  
                  {/* Review content */}
                  <h3 className="font-inter font-medium text-[14px] leading-[17px] text-[#121212] mb-2">Quick resolution customer services</h3>
                  <p className="font-inter font-normal text-[12px] leading-[15px] text-[#A0A0A0] mb-2">Quick resolution customer services</p>
                  <p className="font-inter font-normal text-[12px] leading-[15px] text-[#121212] mb-4">Jane, 1 hour ago</p>
                  <p className="font-inter font-normal text-[14px] leading-[17px] text-[#A0A0A0]">Showing our 5 star reviews</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel Navigation */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={prevReview}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2 focus:outline-none"
            aria-label="Previous review"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 6L7 11" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Carousel indicators */}
          <div className="hidden sm:flex items-center mx-2">
            {[...Array(totalReviews)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveReviewIndex(index);
                  scrollToReview(index);
                }}
                className={`w-2 h-2 mx-1 rounded-full focus:outline-none ${index === activeReviewIndex ? 'bg-[#121212]' : 'bg-gray-300'}`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <button 
            onClick={nextReview}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none"
            aria-label="Next review"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 6L1 11" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default YogaRetreatExperienceSection;
