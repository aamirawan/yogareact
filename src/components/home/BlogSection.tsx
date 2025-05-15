// Blog Section component
import blog1 from '../../assets/images/yogagirl2.jpg';
import blog2 from '../../assets/images/yogagirl4.jpg';
import blog3 from '../../assets/images/yogagirl5.jpg';
import blog4 from '../../assets/images/17.png';
import blog5 from '../../assets/images/18.jpg';

const BlogSection = () => {
  // Note: Blog post data is hardcoded in the JSX for this implementation
  // but could be refactored to use a data array for more dynamic rendering

  // Arrow icon component
  const ArrowIcon = () => (
    <div className="inline-flex items-center ml-2">
      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 14.5L14.5 6.5" stroke="#F1458C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 6.5H14.5V14.5" stroke="#F1458C" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );

  return (
    <section className="relative w-full h-[1032px] bg-[#121212]">
      <div className="max-w-[1440px] mx-auto relative h-full">
        {/* Section Title */}
        <h2 className="absolute w-[379px] h-[55px] left-1/2 -translate-x-1/2 top-[110px] font-inter font-medium text-[52px] leading-[76px] text-center text-white">
          From the Blog
        </h2>
        
        {/* Blog Posts Layout */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Small Post 1 - Top Left */}
          <div className="absolute w-[306px] h-[248px] left-[101px] top-[241px] rounded-[10px] overflow-hidden">
            <img 
              src={blog1} 
              alt="Prenatal Care with Yoga" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[20px] left-[20px] bg-[rgba(21,21,21,0.2)] px-[7.6px] py-[7.6px] rounded">
              <span className="font-inter font-semibold text-[15.2px] leading-[24px] text-white">
                October 10, 2024
              </span>
            </div>
          </div>
          <div className="absolute left-[101px] top-[509px]">
            <a href="#" className="flex items-center font-inter font-semibold text-[20px] leading-[31px] text-white">
              Prenatal Care with Yoga
              <ArrowIcon />
            </a>
          </div>
          
          {/* Small Post 2 - Bottom Left */}
          <div className="absolute w-[306px] h-[248px] left-[101px] top-[591px] rounded-[10px] overflow-hidden">
            <img 
              src={blog2} 
              alt="Prenatal Care with Yoga" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[20px] left-[20px] bg-[rgba(21,21,21,0.2)] px-[7.6px] py-[7.6px] rounded">
              <span className="font-inter font-semibold text-[15.2px] leading-[24px] text-white">
                October 10, 2024
              </span>
            </div>
          </div>
          <div className="absolute left-[101px] top-[859px]">
            <a href="#" className="flex items-center font-inter font-semibold text-[20px] leading-[31px] text-white">
              Prenatal Care with Yoga
              <ArrowIcon />
            </a>
          </div>
          
          {/* Large Post - Center */}
          <div className="absolute w-[574px] h-[598px] left-[433px] top-[241px] rounded-[10px] overflow-hidden">
            <img 
              src={blog3} 
              alt="Sleepless Nights? How Yoga Can Help You Find Rest and Recharge Your Life" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[20px] left-[20px] bg-[rgba(21,21,21,0.2)] px-[7.6px] py-[7.6px] rounded">
              <span className="font-inter font-semibold text-[15.2px] leading-[24px] text-white">
                October 10, 2024
              </span>
            </div>
          </div>
          <div className="absolute w-[574px] left-[433px] top-[859px]">
            <a href="#" className="flex items-center font-inter font-semibold text-[20px] leading-[31px] text-white">
              Sleepless Nights? How Yoga Can Help You Find Rest and Recharge Your Life
              <ArrowIcon />
            </a>
          </div>
          
          {/* Small Post 3 - Top Right */}
          <div className="absolute w-[306px] h-[248px] left-[1033px] top-[241px] rounded-[10px] overflow-hidden">
            <img 
              src={blog4} 
              alt="Prenatal Care with Yoga" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[20px] left-[20px] bg-[rgba(21,21,21,0.2)] px-[7.6px] py-[7.6px] rounded">
              <span className="font-inter font-semibold text-[15.2px] leading-[24px] text-white">
                October 10, 2024
              </span>
            </div>
          </div>
          <div className="absolute left-[1033px] top-[509px]">
            <a href="#" className="flex items-center font-inter font-semibold text-[20px] leading-[31px] text-white">
              Prenatal Care with Yoga
              <ArrowIcon />
            </a>
          </div>
          
          {/* Small Post 4 - Bottom Right */}
          <div className="absolute w-[306px] h-[248px] left-[1033px] top-[591px] rounded-[10px] overflow-hidden">
            <img 
              src={blog5} 
              alt="Prenatal Care with Yoga" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-[20px] left-[20px] bg-[rgba(21,21,21,0.2)] px-[7.6px] py-[7.6px] rounded">
              <span className="font-inter font-semibold text-[15.2px] leading-[24px] text-white">
                October 10, 2024
              </span>
            </div>
          </div>
          <div className="absolute left-[1033px] top-[859px]">
            <a href="#" className="flex items-center font-inter font-semibold text-[20px] leading-[31px] text-white">
              Prenatal Care with Yoga
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
