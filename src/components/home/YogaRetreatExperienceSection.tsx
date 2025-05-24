// Yoga Retreat Experience Section component
import { useState } from 'react';

const YogaRetreatExperienceSection = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  
  const reviews = [
    {
      stars: 5,
      title: 'Love your products.',
      content: 'Love your products.',
      author: 'Jane',
      time: '1 hour ago'
    },
    {
      stars: 5,
      title: 'Love wild',
      content: 'Love wild! Been using for over 6 months and will continue to use.',
      author: 'Tyler',
      time: '4 hours ago'
    },
    {
      stars: 5,
      title: 'quick resolution great customer service',
      content: 'quick resolution great customer service',
      author: 'Susan',
      time: '8 hours ago'
    }
  ];

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
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
        <div className="w-full bg-white">
          <div className="max-w-[1224px] mx-auto flex flex-col items-center">
            {/* Trustpilot Header */}
            <div className="flex flex-col sm:flex-row items-center mb-6 gap-2 sm:gap-0">
              <div className="text-lg md:text-[20px] font-semibold mr-0 sm:mr-4">Excellent</div>
              <div className="flex">
                {[1, 2, 3, 4, 4.5].map((rating, index) => (
                  <div key={index} className="w-5 h-5 sm:w-6 sm:h-6 mr-1">
                    {rating === 4.5 ? (
                      <svg viewBox="0 0 24 24" fill="#00b67a" className="w-full h-full">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="#00b67a" className="w-full h-full">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="ml-0 sm:ml-4 text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                Based on <span className="font-semibold">74,856 reviews</span>
              </div>
            </div>
            
            {/* Trustpilot Reviews Carousel - Mobile View (Single Review) */}
            <div className="block sm:hidden w-full px-4">
              <div className="w-full p-4 border border-gray-200 rounded-md">
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-[#00b67a]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-xs text-gray-500">Verified</span>
                </div>
                <h3 className="font-semibold mb-1">{reviews[activeReviewIndex].title}</h3>
                <p className="text-sm text-gray-700">{reviews[activeReviewIndex].content}</p>
                <div className="mt-2 text-xs text-gray-500">{reviews[activeReviewIndex].author}, {reviews[activeReviewIndex].time}</div>
              </div>
            </div>
            
            {/* Trustpilot Reviews Carousel - Desktop View (Multiple Reviews) */}
            <div className="hidden sm:flex w-full justify-between items-center gap-4 px-4">
              {reviews.map((review, index) => (
                <div key={index} className="w-full md:w-[300px] p-4 border border-gray-200 rounded-md">
                  <div className="flex mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 md:w-5 md:h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-xs text-gray-500">Verified</span>
                  </div>
                  <h3 className="font-semibold mb-1">{review.title}</h3>
                  <p className="text-sm text-gray-700">{review.content}</p>
                  <div className="mt-2 text-xs text-gray-500">{review.author}, {review.time}</div>
                </div>
              ))}
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
        </div>
      </div>
    </section>
  );
};

export default YogaRetreatExperienceSection;
