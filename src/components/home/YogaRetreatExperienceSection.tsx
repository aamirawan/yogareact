// Yoga Retreat Experience Section component

const YogaRetreatExperienceSection = () => {
  // Reviews are now hardcoded in the markup for this implementation

  // Navigation functions for mobile carousel (not used in desktop view)
  const nextReview = () => {
    // Navigation functionality handled by CSS in this implementation
    console.log('Next review');
  };

  const prevReview = () => {
    // Navigation functionality handled by CSS in this implementation
    console.log('Previous review');
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
                  <div className="mr-[2px]">
                    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                    </svg>
                  </div>
                  <div className="mr-[2px]">
                    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                    </svg>
                  </div>
                  <div className="mr-[2px]">
                    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                    </svg>
                  </div>
                  <div className="mr-[2px]">
                    <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                    </svg>
                  </div>
                  {/* Half star */}
                  <div>
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3192 18.6266L18.914 17.1346L21.152 24.2214L13.3192 18.6266ZM25.6278 9.67488H15.9301L12.9462 0.723145L10.3353 9.67488H0.637573L8.47034 15.2697L5.48643 24.2214L13.3192 18.6266L18.168 15.2697L25.6278 9.67488Z" fill="#00B67A"/>
                    </svg>
                  </div>
                </div>
                
                {/* Review count */}
                <p className="font-inter font-normal text-[12px] leading-[15px] text-[#A0A0A0] mb-4">Based on 74,90908 reviews</p>
                
                {/* Trustpilot logo */}
                <div className="flex items-center">
                  <div className="flex">
                    <svg width="112" height="28" viewBox="0 0 112 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="22" height="28" fill="#00B67A"/>
                      <rect x="24" width="22" height="28" fill="#00B67A"/>
                      <rect x="48" width="22" height="28" fill="#00B67A"/>
                      <rect x="72" width="22" height="28" fill="#00B67A"/>
                      <rect x="96" width="22" height="28" fill="#DCDCE6"/>
                    </svg>
                  </div>
                  <div className="ml-2 transform rotate-180">
                    <svg width="112" height="28" viewBox="0 0 112 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 7L23.5 14L18 21L12.5 14L18 7Z" fill="#000000"/>
                      <path d="M8 14L12 7L16 14L12 21L8 14Z" fill="#00B67A"/>
                      <path d="M14 18L16 14L18 18L16 22L14 18Z" fill="#005128"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Reviews carousel */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] w-full md:w-auto overflow-x-auto pb-4 md:ml-auto">
                {/* Review 1 */}
                <div className="min-w-[190px] bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  {/* Trustpilot stars and verified badge */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {/* Full stars */}
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      {/* Half star */}
                      <div className="transform scale-75">
                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3192 18.6266L18.914 17.1346L21.152 24.2214L13.3192 18.6266ZM25.6278 9.67488H15.9301L12.9462 0.723145L10.3353 9.67488H0.637573L8.47034 15.2697L5.48643 24.2214L13.3192 18.6266L18.168 15.2697L25.6278 9.67488Z" fill="#00B67A"/>
                        </svg>
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
                <div className="min-w-[190px] bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  {/* Trustpilot stars and verified badge */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {/* Full stars */}
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      {/* Half star */}
                      <div className="transform scale-75">
                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3192 18.6266L18.914 17.1346L21.152 24.2214L13.3192 18.6266ZM25.6278 9.67488H15.9301L12.9462 0.723145L10.3353 9.67488H0.637573L8.47034 15.2697L5.48643 24.2214L13.3192 18.6266L18.168 15.2697L25.6278 9.67488Z" fill="#00B67A"/>
                        </svg>
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
                <div className="min-w-[190px] bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  {/* Trustpilot stars and verified badge */}
                  <div className="flex items-center mb-3">
                    <div className="flex">
                      {/* Full stars */}
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      <div className="mr-[2px] transform scale-75">
                        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.5278 18.6266L19.1227 17.1346L21.3606 24.2214L13.5278 18.6266ZM26.2094 9.67488H16.5117L13.5278 0.723145L10.5439 9.67488H0.846191L8.67895 15.2697L5.69504 24.2214L13.5278 18.6266L18.3767 15.2697L26.2094 9.67488Z" fill="#00B67A"/>
                        </svg>
                      </div>
                      {/* Half star */}
                      <div className="transform scale-75">
                        <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3192 18.6266L18.914 17.1346L21.152 24.2214L13.3192 18.6266ZM25.6278 9.67488H15.9301L12.9462 0.723145L10.3353 9.67488H0.637573L8.47034 15.2697L5.48643 24.2214L13.3192 18.6266L18.168 15.2697L25.6278 9.67488Z" fill="#00B67A"/>
                        </svg>
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
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2"
          >
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 6L7 11" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={nextReview}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
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
