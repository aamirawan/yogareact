
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo.webp";

const SimpleFooter = () => {
  return (
    <footer className="w-full relative bg-white h-auto md:h-[347px] py-10 md:py-0">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Logo - Absolute positioning on larger screens, regular on mobile */}
        <div className="hidden md:block md:absolute md:left-[100px] md:top-[61px]">
          <img src={logo} alt="Elevate Logo" className="h-[46.89px]" />
        </div>
        
        {/* Mobile logo */}
        <div className="flex justify-center mb-8 md:hidden">
          <img src={logo} alt="Elevate Logo" className="h-[40px]" />
        </div>
        
        {/* Text and Links - Responsive layout */}
        <div className="md:absolute md:left-[100px] md:top-[131px] w-full md:w-[1173.83px] md:h-[54.13px] flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {/* Newsletter text */}
          <div className="w-full md:w-[438.07px] text-center md:text-left">
            <p className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Subscribe to our newsletter and be the first to know about upcoming product launches, sales, and giveaways!
            </p>
          </div>
          
          {/* Navigation links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-8">
            <Link to="/faqs" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              FAQs
            </Link>
            <Link to="/contact" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Contact us
            </Link>
            <Link to="/refer" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Refer
            </Link>
            <Link to="/gift-cards" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Gift Cards
            </Link>
            <Link to="/blog" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Blog
            </Link>
            <Link to="/careers" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Careers
            </Link>
            <Link to="/elevate" className="font-['Inter'] font-normal text-[16px] leading-[27px] text-[#121212]">
              Elevate
            </Link>
          </div>
        </div>
      </div>
      {/* Divider line */}
      <div className="md:absolute md:top-[273px] w-[96%] h-[1px] bg-[#D2D2D2] my-8 md:my-0 mx-auto left-0 right-0"></div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 relative">
        {/* Copyright */}
        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-[303px] text-center">
          <p className="font-['Inter'] font-medium text-[15.77px] leading-[19px] text-[#0A142F] opacity-75">
            © {new Date().getFullYear()} Synergy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
