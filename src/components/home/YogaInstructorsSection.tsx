// Yoga Instructors Section component
import { useState } from 'react';
import instructor1 from '../../assets/images/yogagirl1.png';
import instructor2 from '../../assets/images/yogagirl2.jpg';
import instructor3 from '../../assets/images/yogagirl3.jpg';    

const YogaInstructorsSection = () => {
  // State to track active filter
  const [activeFilter, setActiveFilter] = useState<number>(3);
  
  // State to track current slide for mobile view
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  // Array of filter options
  const filterOptions = [
    { id: 1, label: 'Weight Loss' },
    { id: 2, label: 'PCOS/PCOS' },
    { id: 3, label: 'PCOS/PCOS' },
    { id: 4, label: 'PCOS/PCOS' },
    { id: 5, label: 'PCOS/PCOS' },
    { id: 6, label: 'PCOS/PCOS' },
  ];
  
  // Instructor data array for more dynamic rendering
  const instructors = [
    {
      id: 1,
      name: 'Aishwarya Mondody',
      image: instructor1,
      gradient: '',
    },
    {
      id: 2,
      name: 'Aishwarya Mondody',
      image: instructor2,
      gradient: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), ',
    },
    {
      id: 3,
      name: 'Aishwarya Mondody',
      image: instructor3,
      gradient: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), ',
    },
  ];
  
  // Handle filter click
  const handleFilterClick = (filterId: number) => {
    setActiveFilter(filterId);
    // No actual filtering functionality yet, just updating the active state
  };
  
  // Handle slide navigation
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? instructors.length - 1 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === instructors.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
        {/* Section Title */}
        <h2 className="w-full font-inter font-medium text-[24px] xs:text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] leading-[1.2] xs:leading-[1.3] sm:leading-[1.4] md:leading-[1.5] lg:leading-[76px] text-center text-[#121212] mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          Authentic Indian Yoga
        </h2>

        {/* Filter Buttons - Scrollable on mobile */}
        <div className="w-full overflow-x-auto pb-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="flex gap-2 xs:gap-3 sm:gap-4 md:gap-[25px] min-w-max px-3 sm:px-0 sm:justify-center">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleFilterClick(option.id)}
                className={`flex justify-center items-center px-2 xs:px-3 sm:px-[10.6px] py-1.5 xs:py-2 sm:py-[10.6px] min-w-[80px] xs:min-w-[100px] sm:min-w-[122px] h-[30px] xs:h-[32px] sm:h-[33px] border border-[#6D6D6E] rounded-[6px] ${
                  activeFilter === option.id ? 'bg-[#121212] text-white' : 'bg-transparent text-[#6D6D6E]'
                } transition-colors duration-200 hover:bg-gray-100 hover:text-[#121212] cursor-pointer whitespace-nowrap`}
              >
                <span className="font-poppins font-normal text-[14px] xs:text-[15px] sm:text-[16px] leading-[1.4] sm:leading-[25px]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Slider (visible on mobile) and Desktop Layout (visible on md screens and up) */}
        <div className="relative">
          {/* Mobile Slider View */}
          <div className="md:hidden relative">
            <div className="flex justify-center items-center">
              {/* Current Slide */}
              <div className="w-full xs:w-[85%] sm:w-[70%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Background Image */}
                  <div className="absolute w-full h-[120%] left-0 top-[-10%] bg-cover bg-center"
                       style={{ 
                         backgroundImage: `${instructors[currentSlide].gradient}url('${instructors[currentSlide].image}')` 
                       }}>
                  </div>
                  
                  {/* Overlay - only for first card */}
                  {currentSlide === 0 && (
                    <div className="absolute inset-0 bg-[rgba(11,11,11,0.35)]"></div>
                  )}
                  
                  {/* Divider */}
                  <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
                  
                  {/* Name - Small (visible on all screens) */}
                  <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[18px] xs:text-[20px] sm:text-[22px] leading-[1.4] text-center text-white">
                    {instructors[currentSlide].name}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Slider Navigation */}
            <div className="flex justify-between items-center absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-2 xs:px-4">
              <button 
                onClick={handlePrevSlide}
                className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10"
                aria-label="Previous slide"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 9.5L4 6L7.5 2.5" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <button 
                onClick={handleNextSlide}
                className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md z-10"
                aria-label="Next slide"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Slide Indicators */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {instructors.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-[#121212] w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop Layout (unchanged) */}
          <div className="hidden md:flex md:flex-row gap-4 lg:gap-8 justify-center items-center">
            {/* Card 1 */}
            <div className="md:w-[31%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute w-full h-[120%] left-0 top-[-10%] bg-cover bg-center"
                     style={{ backgroundImage: `url('${instructor1}')` }}>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-[rgba(11,11,11,0.35)]"></div>
                
                {/* Divider */}
                <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
                
                {/* Name - Large */}
                <h3 className="absolute w-[78%] left-[11%] top-[48%] font-inter font-extrabold text-[42px] md:text-[48px] lg:text-[53px] leading-[1.15] text-center text-white">
                  Aishwarya Mondody
                </h3>
                
                {/* Name - Small */}
                <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[22px] md:text-[24px] leading-[1.4] text-center text-white">
                  Aishwarya Mondody
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="md:w-[31%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute w-full h-[120%] left-0 top-[-10%] bg-cover bg-center"
                     style={{ 
                       backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${instructor2}')` 
                     }}>
                </div>
                
                {/* Divider */}
                <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
                
                {/* Name - Large */}
                <h3 className="absolute w-[78%] left-[11%] top-[48%] font-inter font-extrabold text-[42px] md:text-[48px] lg:text-[53px] leading-[1.15] text-center text-white">
                  Aishwarya Mondody
                </h3>
                
                {/* Name - Small */}
                <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[22px] md:text-[24px] leading-[1.4] text-center text-white">
                  Aishwarya Mondody
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="md:w-[31%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute w-full h-full inset-0 bg-cover bg-center"
                     style={{ 
                       backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${instructor3}')` 
                     }}>
                </div>
                
                {/* Divider */}
                <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
                
                {/* Name - Large */}
                <h3 className="absolute w-[78%] left-[11%] top-[48%] font-inter font-extrabold text-[42px] md:text-[48px] lg:text-[53px] leading-[1.15] text-center text-white">
                  Aishwarya Mondody
                </h3>
                
                {/* Name - Small */}
                <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[22px] md:text-[24px] leading-[1.4] text-center text-white">
                  Aishwarya Mondody
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaInstructorsSection;
