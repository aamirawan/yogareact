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
    <section className="relative w-full h-[857px] bg-white">
      <div className="max-w-[1440px] mx-auto relative h-full">
        {/* Section Title */}
        <h2 className="absolute w-[581px] h-[59px] left-1/2 -translate-x-1/2 top-[33px] font-inter font-medium text-[52px] leading-[76px] text-center text-[#121212]">
          Authentic Indian Yoga
        </h2>

        {/* Filter Buttons */}
        <div className="absolute w-[859px] h-[33px] left-[290px] top-[134px] flex gap-[25px]">
          {filterOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => handleFilterClick(option.id)}
              className={`flex justify-center items-center px-[10.6px] py-[10.6px] w-[122px] h-[33px] border border-[#6D6D6E] rounded-[6px] ${
                activeFilter === option.id ? 'bg-[#121212] text-white' : 'bg-transparent text-[#6D6D6E]'
              } transition-colors duration-200 hover:bg-gray-100 hover:text-[#121212] cursor-pointer`}
            >
              <span className="font-poppins font-normal text-[16px] leading-[25px]">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Instructor Cards */}
        <div className="relative w-full h-full">
          {/* Card 1 */}
          <div className="absolute w-[385px] h-[501px] left-[100px] top-[245px] rounded-[10px] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute w-[492px] h-[614px] left-[-52px] top-[-113px] bg-cover bg-center"
                   style={{ backgroundImage: `url('${instructor1}')` }}>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-[rgba(11,11,11,0.35)]"></div>
              
              {/* Play Button 
              <div className="absolute w-[71px] h-[71px] left-[36px] top-[330px] bg-[rgba(88,70,69,0.71)] rounded-full flex items-center justify-center">
                <div className="absolute w-[33px] h-[33px] bg-[#FF5D76] rounded-[3px] transform rotate-90"></div>
              </div>*/}
              
              {/* Divider */}
              <div className="absolute w-[63px] h-[6px] left-[161px] top-[377px] bg-[#D9D9D9] rounded-[10px]"></div>
              
              {/* Name - Large */}
              <h3 className="absolute w-[301px] h-[113px] left-[42px] top-[243px] font-inter font-extrabold text-[53px] leading-[61px] text-center text-white">
                Aishwarya Mondody
              </h3>
              
              {/* Name - Small */}
              <p className="absolute w-[389px] h-[31px] left-0 top-[438px] font-inter font-medium text-[24px] leading-[41px] text-center text-white">
                Aishwarya Mondody
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="absolute w-[385px] h-[501px] left-1/2 -translate-x-1/2 top-[245px] rounded-[10px] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute w-[395px] h-[592px] left-0 top-[-57px] bg-cover bg-center"
                   style={{ 
                     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${instructor2}')` 
                   }}>
              </div>
              
              {/* Play Button */}
              {/* <div className="absolute w-[71px] h-[71px] left-[36px] top-[330px] bg-[#99928C] rounded-full flex items-center justify-center">
                <div className="absolute w-[33px] h-[33px] bg-[#FF5D76] rounded-[3px] transform rotate-90"></div>
              </div> */}
              
              {/* Divider */}
              <div className="absolute w-[63px] h-[6px] left-[161px] top-[377px] bg-[#D9D9D9] rounded-[10px]"></div>
              
              {/* Name - Large */}
              <h3 className="absolute w-[301px] h-[113px] left-[42px] top-[243px] font-inter font-extrabold text-[53px] leading-[61px] text-center text-white">
                Aishwarya Mondody
              </h3>
              
              {/* Name - Small */}
              <p className="absolute w-[389px] h-[31px] left-0 top-[438px] font-inter font-medium text-[24px] leading-[41px] text-center text-white">
                Aishwarya Mondody
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="absolute w-[385px] h-[501px] right-[100px] top-[245px] rounded-[10px] overflow-hidden">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute w-full h-full inset-0 bg-cover bg-center"
                   style={{ 
                     backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${instructor3}')` 
                   }}>
              </div>
              
              {/* Play Button */}
              {/* <div className="absolute w-[71px] h-[71px] left-[36px] top-[330px] bg-[#99928C] rounded-full flex items-center justify-center">
                <div className="absolute w-[33px] h-[33px] bg-[#FF5D76] rounded-[3px] transform rotate-90"></div>
              </div> */}
              
              {/* Divider */}
              <div className="absolute w-[63px] h-[6px] left-[161px] top-[377px] bg-[#D9D9D9] rounded-[10px]"></div>
              
              {/* Name - Large */}
              <h3 className="absolute w-[301px] h-[113px] left-[42px] top-[243px] font-inter font-extrabold text-[53px] leading-[61px] text-center text-white">
                Aishwarya Mondody
              </h3>
              
              {/* Name - Small */}
              <p className="absolute w-[389px] h-[31px] left-0 top-[438px] font-inter font-medium text-[24px] leading-[41px] text-center text-white">
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
