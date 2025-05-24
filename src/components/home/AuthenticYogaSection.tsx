import { Link } from 'react-router-dom';
import icon1 from '../../assets/images/1.svg';
import icon2 from '../../assets/images/2.svg';
import icon3 from '../../assets/images/3.svg';
import icon4 from '../../assets/images/4.svg';
import yogaGirl from '../../assets/images/yoga_girl.png';

const AuthenticYogaSection = () => {
  return (
    <section className="w-full py-10 sm:py-14 md:py-18 lg:py-24 bg-white">
      <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
        {/* Mobile and Tablet Layout (Stack) */}
        <div className="lg:hidden flex flex-col">
          {/* Section Title */}
          <h2 className="text-[28px] xs:text-[32px] sm:text-[38px] md:text-[42px] font-medium leading-[1.2] text-[#121212] mb-4 sm:mb-6">
            Authentic Indian Yoga
          </h2>
          
          {/* Description */}
          <p className="text-[15px] xs:text-[16px] font-normal leading-[1.5] text-[#121212] mb-8 sm:mb-10 max-w-[480px]">
            Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
          </p>
          
          {/* Image for Mobile/Tablet */}
          <div className="w-full mb-8 sm:mb-10">
            <div className="w-full h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] rounded-[15px] overflow-hidden bg-[#F5F5F5]">
              <img src={yogaGirl} alt="Yoga Girl" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-10">
            {/* Feature 1 - Flexible Timings */}
            <div className="flex flex-col">
              <div className="mb-3 sm:mb-4">
                <img src={icon2} alt="Flexible Timings icon" className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-[1.3] text-[#464F60] mb-2 sm:mb-3">
                Flexible Timings
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-normal leading-[1.4] text-[#545454]">
                Choose from 100s of classes daily.
              </p>
            </div>
            
            {/* Feature 2 - Expert Indian Teachers */}
            <div className="flex flex-col">
              <div className="mb-3 sm:mb-4">
                <img src={icon3} alt="Expert Teachers icon" className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-[1.3] text-[#464F60] mb-2 sm:mb-3">
                Expert Indian Teachers
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-normal leading-[1.4] text-[#545454]">
                Choose your best teachers for your own specific needs.
              </p>
            </div>
            
            {/* Feature 3 - LifeTime Bond */}
            <div className="flex flex-col">
              <div className="mb-3 sm:mb-4">
                <img src={icon4} alt="LifeTime Bond icon" className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-[1.3] text-[#464F60] mb-2 sm:mb-3">
                LifeTime Bond
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-normal leading-[1.4] text-[#545454]">
                Talk your heart out privately post session.
              </p>
            </div>
            
            {/* Feature 4 - Accountability */}
            <div className="flex flex-col">
              <div className="mb-3 sm:mb-4">
                <img src={icon1} alt="Accountability icon" className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>
              
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-[1.3] text-[#464F60] mb-2 sm:mb-3">
                Accountability
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-normal leading-[1.4] text-[#545454]">
                Choose from 100s of classes daily.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row xs:space-x-4 sm:space-x-6 mt-8 sm:mt-10 space-y-4 xs:space-y-0">
            <Link 
              to="/about" 
              className="w-full xs:w-[160px] sm:w-[185px] h-[45px] sm:h-[55px] flex justify-center items-center bg-[#121212] rounded-[10px] px-[20px] sm:px-[24px] py-[10px] sm:py-[12px]"
            >
              <span className="font-semibold text-[15px] sm:text-[16px] leading-[1.5] text-white">
                Read more
              </span>
            </Link>
            
            <Link 
              to="/about-us" 
              className="w-full xs:w-[160px] sm:w-[185px] h-[45px] sm:h-[55px] flex justify-center items-center bg-white border border-[#121212] rounded-[10px] px-[20px] sm:px-[24px] py-[10px] sm:py-[12px]"
            >
              <span className="font-semibold text-[15px] sm:text-[16px] leading-[1.5] text-[#121212]">
                About Us
              </span>
            </Link>
          </div>
        </div>
        
        {/* Desktop Layout (Side by Side) */}
        <div className="hidden lg:flex">
          {/* Left Content */}
          <div className="w-1/2 pr-8 xl:pr-16">
            {/* Section Title */}
            <h2 className="text-[38px] xl:text-[40px] font-medium leading-[1.2] text-[#121212] mb-6">
              Authentic Indian Yoga
            </h2>
            
            {/* Description */}
            <p className="text-[16px] font-normal leading-[1.5] text-[#171717] mb-12 xl:mb-16 max-w-[480px]">
              Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-x-10 xl:gap-x-16 gap-y-10 xl:gap-y-14">
              {/* Feature 1 - Flexible Timings */}
              <div className="flex flex-col">
                <div className="mb-4 xl:mb-5">
                  <img src={icon2} alt="Flexible Timings icon" className="h-8 w-8" />
                </div>
                
                <h3 className="text-[14px] font-bold leading-[22px] text-[#2b303b]">
                  Flexible Timings
                </h3>
                
                <p className="text-[14px] font-normal leading-[22px] text-[#2b303b] max-w-[220px]">
                  Choose from 100s of classes daily.
                </p>
              </div>
              
              {/* Feature 2 - Expert Indian Teachers */}
              <div className="flex flex-col">
                <div className="mb-4 xl:mb-5">
                  <img src={icon3} alt="Expert Teachers icon" className="h-8 w-8" />
                </div>
                
                <h3 className="text-[14px] font-bold leading-[22px] text-[#2b303b]">
                  Expert Indian Teachers
                </h3>
                
                <p className="text-[14px] font-normal leading-[22px] text-[#2b303b] max-w-[220px]">
                  Choose your best teachers for your own specific needs.
                </p>
              </div>
              
              {/* Feature 3 - LifeTime Bond */}
              <div className="flex flex-col">
                <div className="mb-4 xl:mb-5">
                  <img src={icon4} alt="LifeTime Bond icon" className="h-8 w-8" />
                </div>
                
                <h3 className="text-[14px] font-bold leading-[22px] text-[#2b303b]">
                  LifeTime Bond
                </h3>
                
                <p className="text-[14px] font-normal leading-[22px] text-[#2b303b] max-w-[220px]">
                  Talk your heart out privately post session.
                </p>
              </div>
              
              {/* Feature 4 - Accountability */}
              <div className="flex flex-col">
                <div className="mb-4 xl:mb-5">
                  <img src={icon1} alt="Accountability icon" className="h-8 w-8" />
                </div>
                
                <h3 className="text-[14px] font-bold leading-[22px] text-[#2b303b]">
                  Accountability
                </h3>
                
                <p className="text-[14px] font-normal leading-[22px] text-[#2b303b] max-w-[220px]">
                  Choose from 100s of classes daily.
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-6 mt-12 xl:mt-14">
              <Link 
                to="/about" 
                className="flex justify-center items-center bg-[#121212] rounded-[10px] px-[24px] py-[12px]"
              >
                <span className="font-semibold text-[16px] leading-[24px] text-white">
                  Read more
                </span>
              </Link>
              
              <Link 
                to="/about-us" 
                className="flex justify-center items-center bg-white border border-[#121212] rounded-[10px] px-[24px] py-[12px]"
              >
                <span className="font-semibold text-[16px] leading-[24px] text-[#121212]">
                  About Us
                </span>
              </Link>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-full h-[500px] xl:h-[600px] rounded-[20px] overflow-hidden">
              <img src={yogaGirl} alt="Yoga Girl" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticYogaSection;
