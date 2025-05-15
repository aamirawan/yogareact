import { Link } from 'react-router-dom';
import icon1 from '../../assets/images/1.svg';
import icon2 from '../../assets/images/2.svg';
import icon3 from '../../assets/images/3.svg';
import icon4 from '../../assets/images/4.svg';
import yogaGirl from '../../assets/images/yoga_girl.png';

const AuthenticYogaSection = () => {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-[100px] flex">
        {/* Left Content */}
        <div className="w-1/2 pr-16">
          {/* Section Title */}
          <h2 className="text-[46px] font-medium leading-[56px] text-[#121212] mb-6">
            Authentic Indian Yoga
          </h2>
          
          {/* Description */}
          <p className="text-[16px] font-normal leading-[24px] text-[#121212] mb-16 max-w-[480px]">
            Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-14">
            {/* Feature 1 - Flexible Timings */}
            <div className="flex flex-col">
              <div className="mb-5">
                <img src={icon2} alt="Flexible Timings icon" className="h-8 w-8" />
              </div>
              
              <h3 className="text-[18px] font-bold leading-[22px] text-[#464F60] mb-3">
                Flexible Timings
              </h3>
              
              <p className="text-[15px] font-normal leading-[22px] text-[#545454] max-w-[220px]">
                Choose from 100s of classes daily.
              </p>
            </div>
            
            {/* Feature 2 - Expert Indian Teachers */}
            <div className="flex flex-col">
              <div className="mb-5">
                <img src={icon3} alt="Expert Teachers icon" className="h-8 w-8" />
              </div>
              
              <h3 className="text-[18px] font-bold leading-[22px] text-[#464F60] mb-3">
                Expert Indian Teachers
              </h3>
              
              <p className="text-[15px] font-normal leading-[22px] text-[#545454] max-w-[220px]">
                Choose your best teachers for your own specific needs.
              </p>
            </div>
            
            {/* Feature 3 - LifeTime Bond */}
            <div className="flex flex-col">
              <div className="mb-5">
                <img src={icon4} alt="LifeTime Bond icon" className="h-8 w-8" />
              </div>
              
              <h3 className="text-[18px] font-bold leading-[22px] text-[#464F60] mb-3">
                LifeTime Bond
              </h3>
              
              <p className="text-[15px] font-normal leading-[22px] text-[#545454] max-w-[220px]">
                Talk your heart out privately post session.
              </p>
            </div>
            
            {/* Feature 4 - Accountability */}
            <div className="flex flex-col">
              <div className="mb-5">
                <img src={icon1} alt="Accountability icon" className="h-8 w-8" />
              </div>
              
              <h3 className="text-[18px] font-bold leading-[22px] text-[#464F60] mb-3">
                Accountability
              </h3>
              
              <p className="text-[15px] font-normal leading-[22px] text-[#545454] max-w-[220px]">
                Choose from 100s of classes daily.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-6 mt-14">
            <Link 
              to="/about" 
              className="w-[185px] h-[55px] flex justify-center items-center bg-[#121212] rounded-[10px] px-[24px] py-[12px]"
            >
              <span className="font-semibold text-[16px] leading-[24px] text-white">
                Read more
              </span>
            </Link>
            
            <Link 
              to="/about-us" 
              className="w-[185px] h-[55px] flex justify-center items-center bg-white border border-[#121212] rounded-[10px] px-[24px] py-[12px]"
            >
              <span className="font-semibold text-[16px] leading-[24px] text-[#121212]">
                About Us
              </span>
            </Link>
          </div>
        </div>
        
        {/* Right Image */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full h-[600px] rounded-[20px] overflow-hidden bg-[#F5F5F5]">
            <img src={yogaGirl} alt="Yoga Girl" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticYogaSection;
