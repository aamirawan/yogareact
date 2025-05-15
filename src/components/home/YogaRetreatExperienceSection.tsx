// Yoga Retreat Experience Section component

const YogaRetreatExperienceSection = () => {
  return (
    <section className="relative w-full h-[835px] bg-white">
      <div className="max-w-[1440px] mx-auto relative h-full">
        {/* Section Title */}
        <h2 className="absolute w-[893px] h-[125px] left-1/2 -translate-x-1/2 top-[127px] font-inter font-medium text-[52px] leading-[76px] text-center text-[#121212]">
          Yoga Retreat Like Experience<br />
          Anytime, Anywhere!
        </h2>
        
        {/* Section Description */}
        <p className="absolute w-[558px] h-[46px] left-1/2 -translate-x-1/2 top-[304px] font-inter font-normal text-[18px] leading-[23px] text-center text-[#121212]">
          Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
        </p>
        
        {/* Session Type Buttons */}
        <div className="absolute top-[402px] left-1/2 -translate-x-1/2 flex space-x-6">
          <button className="w-[197px] h-[55px] bg-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] leading-[24px] text-white">
            1:1 Sessions
          </button>
          <button className="w-[197px] h-[55px] bg-white border border-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] leading-[24px] text-[#121212]">
            Daily Sessions
          </button>
          <button className="w-[197px] h-[55px] bg-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] leading-[24px] text-white">
            Group Classes
          </button>
        </div>
        
        {/* Trustpilot Reviews Section */}
        <div className="absolute left-0 right-0 bottom-[65px] h-[220px] bg-white">
          <div className="max-w-[1200px] mx-auto h-full flex flex-col items-center justify-center">
            {/* Trustpilot Header */}
            <div className="flex items-center mb-4">
              <div className="text-[20px] font-semibold mr-4">Excellent</div>
              <div className="flex">
                {[1, 2, 3, 4, 4.5].map((rating, index) => (
                  <div key={index} className="w-6 h-6 mr-1">
                    {rating === 4.5 ? (
                      <svg viewBox="0 0 24 24" fill="#00b67a" className="w-6 h-6">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="#00b67a" className="w-6 h-6">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="ml-4 text-sm text-gray-600">
                Based on <span className="font-semibold">74,856 reviews</span>
              </div>
            </div>
            
            {/* Trustpilot Reviews Carousel */}
            <div className="w-full flex justify-between items-center">
              {/* Review 1 */}
              <div className="w-[300px] p-4 border border-gray-200 rounded-md">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-gray-500">Verified</span>
                </div>
                <h3 className="font-semibold mb-1">Love your products.</h3>
                <p className="text-sm text-gray-700">Love your products.</p>
                <div className="mt-2 text-xs text-gray-500">Jane, 1 hour ago</div>
              </div>
              
              {/* Review 2 */}
              <div className="w-[300px] p-4 border border-gray-200 rounded-md">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-gray-500">Verified</span>
                </div>
                <h3 className="font-semibold mb-1">Love wild</h3>
                <p className="text-sm text-gray-700">Love wild! Been using for over 6 months and will continue to use.</p>
                <div className="mt-2 text-xs text-gray-500">Tyler, 4 hours ago</div>
              </div>
              
              {/* Review 3 */}
              <div className="w-[300px] p-4 border border-gray-200 rounded-md">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-gray-500">Verified</span>
                </div>
                <h3 className="font-semibold mb-1">quick resolution great customer service</h3>
                <p className="text-sm text-gray-700">quick resolution great customer service</p>
                <div className="mt-2 text-xs text-gray-500">Susan, 8 hours ago</div>
              </div>
            </div>
            
            {/* Carousel Navigation */}
            <div className="flex justify-center mt-4">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center mr-2">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 6L7 11" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L7 6L1 11" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaRetreatExperienceSection;
