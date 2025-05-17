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
  const [error, setError] = useState<string | null>(null);
  
  // Fetch packages from the API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await publicApi.getSubscriptionPackages();
        if (response.success) {
          setPackages(response.data);
        } else {
          setError('Failed to fetch packages');
        }
      } catch (err) {
        setError('Error connecting to the server');
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
  
  // Calculate the exact percentage to move for each slide
  const slideWidth = displayPlans.length > 0 ? 100 / displayPlans.length : 33.33;

  return (
    <section id="yogaPlansSection" className="relative w-full max-w-[1440px] h-[905px] bg-white mx-auto">
      <div className="relative h-full">
        {/* Section Title */}
        <h2 className="absolute w-full text-center top-[133px] font-inter font-medium text-[52px] leading-[76px] text-[#121212]">
          Join <span className="text-[#FF5D76]">#1</span> Interactive Group Yoga Classes
        </h2>
        
        {/* Tab Buttons */}
        <div className="absolute w-[303px] h-[55px] left-1/2 -translate-x-1/2 top-[240px] flex">
          <button 
            className={`w-[170px] h-[55px] rounded-l-[10px] font-poppins font-semibold text-[16px] ${activeTab === 'group' ? 'bg-[#121212] text-white' : 'bg-[#E9E9E9] text-[#121212]'}`}
            onClick={() => {
              setActiveTab('group');
              setCurrentSlide(0); // Reset slide position when changing tabs
            }}
          >
            Group Classes
          </button>
          <button 
            className={`w-[133px] h-[55px] rounded-r-[10px] font-poppins font-semibold text-[16px] ${activeTab === 'one-on-one' ? 'bg-[#121212] text-white' : 'bg-[#E9E9E9] text-[#121212]'}`}
            onClick={() => {
              setActiveTab('one-on-one');
              setCurrentSlide(0); // Reset slide position when changing tabs
            }}
          >
            1:1 Sessions
          </button>
        </div>
        
        {/* Plans Carousel */}
        <div className="absolute w-full top-[358px] flex justify-center">
          <div className="relative w-full max-w-[1240px] h-[463px] overflow-hidden">
            {/* Plans Container */}
            <div 
              className="flex justify-center transition-transform duration-500 h-full w-full" 
              style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
            >
              {displayPlans.map((plan, index) => (
                <div key={plan.id} className="relative min-w-[33.33%] h-full px-4">
                  <div className="relative w-[401px] h-[463px] bg-[#121212] border border-[#D1D1D1] rounded-[10px] mx-auto">
                    {/* Duration */}
                    <div className="absolute left-[10px] top-[50px] w-[133px] h-[91px] text-center">
                      <h3 className="font-inter font-bold text-[52px] leading-[54px] text-[#D2D1D1]">
                        {plan.duration}
                      </h3>
                      <p className="font-inter font-bold text-[31px] leading-[32px] text-[#D2D1D1]">
                        months
                      </p>
                    </div>
                    
                    {/* Price */}
                    <div className="absolute right-[57px] top-[72px]">
                      <h4 className="font-inter font-medium text-[35px] leading-[12px] text-[#FF5D76]">
                        {plan.price}
                      </h4>
                    </div>
                    
                    {/* GST and Monthly */}
                    <div className="absolute right-[57px] top-[116px] text-right">
                      <span className="font-inter font-normal text-[14px] leading-[17px] text-[#FF5D76] mr-2">
                        {plan.gst}
                      </span>
                      <span className="font-inter font-normal text-[15px] leading-[17px] text-white">
                        {plan.monthly}
                      </span>
                    </div>
                    
                    {/* Benefits */}
                    <div className="absolute left-[37px] top-[187px] space-y-[28px]">
                      {plan.benefits.slice(0, 4).map((benefit, i) => (
                        <p key={i} className="font-inter font-normal text-[16px] leading-[18px] text-white">
                          {benefit}
                        </p>
                      ))}
                    </div>
                    
                    {/* Buy Now Button */}
                    <button className="absolute left-[108px] bottom-[27px] w-[185px] h-[55px] bg-white border border-[#121212] rounded-[10px] font-poppins font-semibold text-[16px] text-[#121212]">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="absolute w-full flex justify-between px-20 top-[550px]">
          <button 
            onClick={prevSlide}
            className="w-[49px] h-[49px] bg-[#E9E9E9] rounded-full flex items-center justify-center"
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
            className="w-[49px] h-[49px] bg-[#E9E9E9] rounded-full flex items-center justify-center"
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
    </section>
  );
};

export default YogaPlansSection;
