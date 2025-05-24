import { useState, useEffect } from 'react';
import { publicApi } from '../../services/api';

// Define the Package interface based on the database schema
interface Package {
  id: number;
  name: string;
  description: string | null;
  durationDays: number | null;
  price: number | null;
  freeTrialClasses: number | null;
  groupClasses: number | null;
  oneOnOneSessions: number | null;
  type: 'group' | 'one-on-one';
  features: string[] | null;
  isActive: boolean | null;
}

// Define the formatted plan interface for display
interface FormattedPlan {
  id: number;
  duration: string;
  price: string;
  gst: string;
  monthly: string;
  benefits: string[];
  type: 'group' | 'one-on-one';
}

const YogaPlansSection = () => {
  const [activeTab, setActiveTab] = useState<'group' | 'one-on-one'>('group');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch packages from the API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getSubscriptionPackages();
        if (response.success) {
          setPackages(response.data);
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  // Filter packages by active tab (group or one-on-one)
  const filteredPackages = packages.filter(pkg => pkg.type === activeTab);
  
  // Format packages for display
  const formatPackage = (pkg: Package): FormattedPlan => {
    // Convert string values to numbers for calculations
    const safeNumber = (value: number | string | null | undefined): number => {
      if (value === null || value === undefined) return 0;
      return typeof value === 'string' ? parseFloat(value) : value;
    };
    
    // Calculate duration in months from days
    const durationDays = safeNumber(pkg.durationDays);
    const durationMonths = durationDays ? Math.round(durationDays / 30) : 0;
    
    // Calculate GST (18% in India)
    const price = safeNumber(pkg.price);
    const gstAmount = price ? Math.round(price * 0.18) : 0;
    
    // Calculate monthly price
    const monthlyPrice = price && durationMonths ? Math.round(price / durationMonths) : 0;
    
    // Parse features from JSON if needed
    let benefits: string[] = [];
    
    // First try to use the features field if available
    if (pkg.features) {
      if (typeof pkg.features === 'string') {
        try {
          benefits = JSON.parse(pkg.features);
        } catch (e) {
          benefits = [pkg.features];
        }
      } else {
        benefits = pkg.features;
      }
    }
    
    // If description is available, try to extract benefits from it
    if (benefits.length === 0 && pkg.description) {
      // Check if description contains bullet points or line breaks
      const description = pkg.description.trim();
      if (description.includes('\n') || description.includes('•') || description.includes('-')) {
        // Split by newlines or bullet points
        const lines = description
          .split(/[\n\r]+|(?=[•-])/)
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.startsWith('•') || line.startsWith('-') ? line : `+ ${line}`);
        
        if (lines.length > 0) {
          benefits = lines;
        }
      } else if (description.length > 0) {
        // Use the whole description as a single benefit
        benefits = [`+ ${description}`];
      }
    }
    
    // If still no benefits, create default features based on package type
    if (benefits.length === 0) {
      if (pkg.type === 'group') {
        benefits = [
          `+ ${pkg.groupClasses || 0} group classes`,
          `+ ${pkg.freeTrialClasses || 0} free trial classes`,
          '+ Access to recorded sessions',
          '+ Community support'
        ];
      } else {
        benefits = [
          `+ ${pkg.oneOnOneSessions || 0} one-on-one sessions`,
          `+ ${pkg.freeTrialClasses || 0} free trial classes`,
          '+ Personalized training',
          '+ Priority support'
        ];
      }
    }
    
    // Ensure all benefits start with '+'
    benefits = benefits.map(benefit => 
      benefit.trim().startsWith('+') ? benefit.trim() : `+ ${benefit.trim()}`
    );
    
    // Ensure price values are properly formatted numbers
    const formatPrice = (value: number | string | null | undefined): string => {
      if (value === null || value === undefined) return '0.00';
      
      // Convert to number if it's a string
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      
      // Check if it's a valid number
      return isNaN(numValue) ? '0.00' : numValue.toFixed(2);
    };
    
    return {
      id: pkg.id,
      duration: durationMonths.toString(),
      price: `₹${formatPrice(pkg.price)}`,
      gst: `+ ₹${formatPrice(gstAmount)} GST`,
      monthly: `(₹${formatPrice(monthlyPrice)}/mo)`,
      benefits,
      type: pkg.type
    };
  };
  
  // Format all filtered packages
  const plans = filteredPackages.map(formatPackage);
  
  // Handle loading and empty states
  const displayPlans = loading
    ? Array(3).fill(null).map((_, i) => ({
        id: i,
        duration: '...',
        price: '₹...',
        gst: '+ ₹... GST',
        monthly: '(₹.../mo)',
        benefits: ['Loading...', 'Loading...', 'Loading...', 'Loading...'],
        type: activeTab
      }))
    : plans.length > 0
      ? plans
      : Array(3).fill(null).map((_, i) => ({
          id: i,
          duration: i === 0 ? '12' : i === 1 ? '6' : '3',
          price: '₹12390',
          gst: '+ ₹2231 GST',
          monthly: '(₹1032/mo)',
          benefits: [
            '+ No packages available',
            '+ Please check back later',
            '+ Contact support for details',
            '+ Or try different plan type'
          ],
          type: activeTab
        }));
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === displayPlans.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? displayPlans.length - 1 : prev - 1));
  };
  
  // On larger screens we'll show multiple slides, but on mobile/tablet we'll show just one
  // This is handled in the CSS classes and transform style

  return (
    <section id="yogaPlansSection" className="relative w-full bg-white py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="relative max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
        {/* Section Title */}
        <h2 className="w-full text-center font-inter font-medium text-[24px] xs:text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] leading-[1.2] xs:leading-[1.3] sm:leading-[1.4] md:leading-[1.5] lg:leading-[76px] text-[#121212] mb-6 sm:mb-8 md:mb-10 lg:mb-14">
          Join <span className="text-[#FF5D76]">#1</span> Interactive Group Yoga Classes
        </h2>
        
        {/* Tab Buttons */}
        <div className="w-full max-w-[250px] xs:max-w-[280px] sm:max-w-[303px] h-[40px] xs:h-[45px] sm:h-[50px] md:h-[55px] mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 flex">
          <button 
            className={`w-[60%] h-full rounded-l-[10px] font-poppins font-semibold text-[14px] sm:text-[15px] md:text-[16px] ${activeTab === 'group' ? 'bg-[#121212] text-white' : 'bg-[#E9E9E9] text-[#121212]'}`}
            onClick={() => {
              setActiveTab('group');
              setCurrentSlide(0); // Reset slide position when changing tabs
            }}
          >
            Group Classes
          </button>
          <button 
            className={`w-[40%] h-full rounded-r-[10px] font-poppins font-semibold text-[14px] sm:text-[15px] md:text-[16px] ${activeTab === 'one-on-one' ? 'bg-[#121212] text-white' : 'bg-[#E9E9E9] text-[#121212]'}`}
            onClick={() => {
              setActiveTab('one-on-one');
              setCurrentSlide(0); // Reset slide position when changing tabs
            }}
          >
            1:1 Sessions
          </button>
        </div>
        
        {/* Plans Carousel - Different layouts for mobile and desktop */}
        <div className="w-full">
          {/* Mobile Layout (Stack with side arrows) - Hidden on large screens */}
          <div className="lg:hidden w-full relative px-4 xs:px-6 sm:px-8 md:px-10">
            {/* Mobile Carousel Container */}
            <div className="relative w-full max-w-[90%] xs:max-w-[85%] mx-auto">
              {/* Side Navigation Buttons - Mobile */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-5 xs:-left-7 sm:-left-10 z-10">
                <button 
                  onClick={prevSlide}
                  className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px] bg-[#E9E9E9] rounded-full flex items-center justify-center shadow-md"
                  aria-label="Previous plan"
                >
                  <svg 
                    width="10" 
                    height="10" 
                    viewBox="0 0 14 14" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="xs:w-[12px] xs:h-[12px]"
                  >
                    <path 
                      d="M7 1L1 7L7 13" 
                      stroke="#121212" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              
              <div className="absolute top-1/2 -translate-y-1/2 -right-5 xs:-right-7 sm:-right-10 z-10">
                <button 
                  onClick={nextSlide}
                  className="w-[36px] h-[36px] xs:w-[40px] xs:h-[40px] sm:w-[45px] sm:h-[45px] bg-[#E9E9E9] rounded-full flex items-center justify-center shadow-md"
                  aria-label="Next plan"
                >
                  <svg 
                    width="10" 
                    height="10" 
                    viewBox="0 0 14 14" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform rotate-180 xs:w-[12px] xs:h-[12px]"
                  >
                    <path 
                      d="M7 1L1 7L7 13" 
                      stroke="#121212" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Plans Container */}
              <div className="overflow-hidden rounded-[15px]">
                <div 
                  className="flex transition-transform duration-500 w-full" 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {displayPlans.map((plan) => (
                    <div key={plan.id} className="w-full flex-shrink-0">
                      <div className="w-full bg-[#121212] border border-[#D1D1D1] rounded-[15px] p-6 xs:p-7 sm:p-8">
                        {/* Duration */}
                        <div className="mb-4 xs:mb-5 sm:mb-6 text-center">
                          <h3 className="font-inter font-bold text-[32px] xs:text-[36px] sm:text-[40px] leading-[1.1] text-[#D2D1D1]">
                            {plan.duration}
                          </h3>
                          <p className="font-inter font-bold text-[18px] xs:text-[20px] sm:text-[22px] leading-[1.1] text-[#D2D1D1]">
                            months
                          </p>
                        </div>
                        
                        {/* Price */}
                        <div className="text-center mb-2">
                          <h4 className="font-inter font-medium text-[24px] xs:text-[26px] sm:text-[28px] leading-[1.2] text-[#FF5D76]">
                            {plan.price}
                          </h4>
                        </div>
                        
                        {/* GST and Monthly */}
                        <div className="text-center mb-6 xs:mb-7 sm:mb-8">
                          <span className="font-inter font-normal text-[14px] sm:text-[15px] leading-[1.2] text-[#FF5D76] mr-2">
                            {plan.gst}
                          </span>
                          <span className="font-inter font-normal text-[14px] sm:text-[15px] leading-[1.2] text-white">
                            {plan.monthly}
                          </span>
                        </div>
                        
                        {/* Benefits */}
                        <div className="space-y-4 xs:space-y-5 mb-6 xs:mb-7 sm:mb-8 px-2">
                          {plan.benefits.slice(0, 4).map((benefit, i) => (
                            <p key={i} className="font-inter font-normal text-[15px] sm:text-[16px] leading-[1.4] text-white text-center">
                              {benefit}
                            </p>
                          ))}
                        </div>
                        
                        {/* Buy Now Button */}
                        <div className="flex justify-center">
                          <button className="w-[80%] xs:w-[75%] sm:w-[70%] h-[45px] xs:h-[48px] sm:h-[50px] bg-white border border-[#121212] rounded-[10px] font-poppins font-semibold text-[14px] xs:text-[15px] sm:text-[16px] text-[#121212] hover:bg-gray-100 transition-colors duration-300">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile Indicator Dots */}
              <div className="flex justify-center space-x-3 mt-6">
                {displayPlans.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentSlide(idx)} 
                    className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'w-8 bg-[#FF5D76]' : 'w-2.5 bg-gray-300'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Layout (Side by Side) - Hidden on small screens */}
          <div className="hidden lg:block w-full mb-8">
            <div className="relative w-full max-w-[1224px] mx-auto overflow-hidden px-0">
              {/* Plans Container for Desktop */}
              <div 
                className="flex justify-center transition-transform duration-500 w-full" 
                style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
              >
                {displayPlans.map((plan) => (
                  <div key={plan.id} className="w-1/3 px-2">
                    <div className="w-full h-full bg-[#121212] border border-[#D1D1D1] rounded-[15px] p-8 lg:p-10">
                      {/* Duration */}
                      <div className="mb-8 text-left">
                        <h3 className="font-inter font-bold text-[52px] leading-[1.1] text-[#D2D1D1]">
                          {plan.duration}
                        </h3>
                        <p className="font-inter font-bold text-[31px] leading-[1.1] text-[#D2D1D1]">
                          months
                        </p>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right mb-1">
                        <h4 className="font-inter font-medium text-[35px] leading-[1.2] text-[#FF5D76]">
                          {plan.price}
                        </h4>
                      </div>
                      
                      {/* GST and Monthly */}
                      <div className="text-right mb-10">
                        <span className="font-inter font-normal text-[14px] leading-[1.2] text-[#FF5D76] mr-2">
                          {plan.gst}
                        </span>
                        <span className="font-inter font-normal text-[15px] leading-[1.2] text-white">
                          {plan.monthly}
                        </span>
                      </div>
                      
                      {/* Benefits */}
                      <div className="space-y-[28px] mb-10">
                        {plan.benefits.slice(0, 4).map((benefit, i) => (
                          <p key={i} className="font-inter font-normal text-[16px] leading-[1.3] text-white">
                            {benefit}
                          </p>
                        ))}
                      </div>
                      
                      {/* Buy Now Button */}
                      <div className="flex justify-center">
                        <button className="w-[185px] h-[55px] bg-white border border-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] text-[#121212] hover:bg-gray-100 transition-colors duration-300">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
            
            {/* Desktop Navigation Buttons - Positioned outside the carousel */}
            <div className="w-full flex justify-between absolute top-[65%] -translate-y-1/2" style={{ width: 'calc(100% + 120px)', left: '-60px' }}>
              <button 
                onClick={prevSlide}
                className="w-[49px] h-[49px] bg-[#E9E9E9] rounded-full flex items-center justify-center shadow-md"
                aria-label="Previous plan"
              >
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 14 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M7 1L1 7L7 13" 
                    stroke="#121212" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="w-[49px] h-[49px] bg-[#E9E9E9] rounded-full flex items-center justify-center shadow-md"
                aria-label="Next plan"
              >
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 14 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="transform rotate-180"
                >
                  <path 
                    d="M7 1L1 7L7 13" 
                    stroke="#121212" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaPlansSection;
