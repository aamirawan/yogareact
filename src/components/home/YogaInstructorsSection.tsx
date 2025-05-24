// Yoga Instructors Section component
import { useState } from 'react';
import instructor1 from '../../assets/images/yogagirl1.png';
import instructor2 from '../../assets/images/yogagirl2.jpg';
import instructor3 from '../../assets/images/yogagirl3.jpg';    

const YogaInstructorsSection = () => {
  // State to track active filter
  const [activeFilter, setActiveFilter] = useState<number>(3);
  
  // Array of filter options
  const filterOptions = [
    { id: 1, label: 'Weight Loss' },
    { id: 2, label: 'PCOS/PCOS' },
    { id: 3, label: 'PCOS/PCOS' },
    { id: 4, label: 'PCOS/PCOS' },
    { id: 5, label: 'PCOS/PCOS' },
    { id: 6, label: 'PCOS/PCOS' },
  ];
  
  // Handle filter click
  const handleFilterClick = (filterId: number) => {
    setActiveFilter(filterId);
    // No actual filtering functionality yet, just updating the active state
  };

  // Note: Instructor data is hardcoded in the JSX for this implementation
  // but could be refactored to use a data array for more dynamic rendering

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

        {/* Instructor Cards - Flex layout for responsiveness */}
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-4 lg:gap-8 justify-center items-center">
          {/* Card 1 */}
          <div className="w-full xs:w-[85%] sm:w-[70%] md:w-[31%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute w-full h-[120%] left-0 top-[-10%] bg-cover bg-center"
                   style={{ backgroundImage: `url('${instructor1}')` }}>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-[rgba(11,11,11,0.35)]"></div>
              
              {/* Divider */}
              <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
              
              {/* Name - Large (hidden on small screens) */}
              <h3 className="absolute w-[78%] left-[11%] top-[48%] font-inter font-extrabold text-[32px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[53px] leading-[1.15] text-center text-white hidden sm:block">
                Aishwarya Mondody
              </h3>
              
              {/* Name - Small (visible on all screens) */}
              <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[18px] xs:text-[20px] sm:text-[22px] md:text-[24px] leading-[1.4] text-center text-white">
                Aishwarya Mondody
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="w-full xs:w-[85%] sm:w-[70%] md:w-[31%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute w-full h-[120%] left-0 top-[-10%] bg-cover bg-center"
                   style={{ 
                     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${instructor2}')` 
                   }}>
              </div>
              
              {/* Divider */}
              <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
              
              {/* Name - Large (hidden on small screens) */}
              <h3 className="absolute w-[78%] left-[11%] top-[48%] font-inter font-extrabold text-[32px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[53px] leading-[1.15] text-center text-white hidden sm:block">
                Aishwarya Mondody
              </h3>
              
              {/* Name - Small (visible on all screens) */}
              <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[18px] xs:text-[20px] sm:text-[22px] md:text-[24px] leading-[1.4] text-center text-white">
                Aishwarya Mondody
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="w-full xs:w-[85%] sm:w-[70%] md:w-[31%] max-w-[385px] aspect-[385/501] rounded-[10px] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute w-full h-full inset-0 bg-cover bg-center"
                   style={{ 
                     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${instructor3}')` 
                   }}>
              </div>
              
              {/* Divider */}
              <div className="absolute w-[15%] h-[6px] left-[42.5%] top-[75%] bg-[#D9D9D9] rounded-[10px]"></div>
              
              {/* Name - Large (hidden on small screens) */}
              <h3 className="absolute w-[78%] left-[11%] top-[48%] font-inter font-extrabold text-[32px] xs:text-[36px] sm:text-[42px] md:text-[48px] lg:text-[53px] leading-[1.15] text-center text-white hidden sm:block">
                Aishwarya Mondody
              </h3>
              
              {/* Name - Small (visible on all screens) */}
              <p className="absolute w-full left-0 bottom-[8%] font-inter font-medium text-[18px] xs:text-[20px] sm:text-[22px] md:text-[24px] leading-[1.4] text-center text-white">
                Aishwarya Mondody
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaInstructorsSection;
