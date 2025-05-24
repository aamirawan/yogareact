// Blog Section component
// Blog Section component
import blog1 from '../../assets/images/yogagirl2.jpg';
import blog2 from '../../assets/images/yogagirl4.jpg';
import blog3 from '../../assets/images/yogagirl5.jpg';
import blog4 from '../../assets/images/17.png';
import blog5 from '../../assets/images/18.jpg';

const BlogSection = () => {
  // Blog posts data array for more dynamic rendering
  const blogPosts = [
    {
      id: 1,
      image: blog1,
      title: 'Prenatal Care with Yoga',
      date: 'October 10, 2024',
      size: 'small'
    },
    {
      id: 2,
      image: blog2,
      title: 'Prenatal Care with Yoga',
      date: 'October 10, 2024',
      size: 'small'
    },
    {
      id: 3,
      image: blog3,
      title: 'Sleepless Nights? How Yoga Can Help You Find Rest and Recharge Your Life',
      date: 'October 10, 2024',
      size: 'large'
    },
    {
      id: 4,
      image: blog4,
      title: 'Prenatal Care with Yoga',
      date: 'October 10, 2024',
      size: 'small'
    },
    {
      id: 5,
      image: blog5,
      title: 'Prenatal Care with Yoga',
      date: 'October 10, 2024',
      size: 'small'
    }
  ];

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
    <section className="relative w-full bg-[#121212] py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
        {/* Section Title */}
        <h2 className="w-full font-inter font-medium text-[24px] xs:text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] leading-[1.2] xs:leading-[1.3] sm:leading-[1.4] md:leading-[1.5] lg:leading-[76px] text-center text-white mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          From the Blog
        </h2>
        
        {/* Blog Posts Layout - Grid for larger screens, Stack for mobile */}
        <div className="w-full">
          {/* Mobile Layout (Stack) */}
          <div className="md:hidden flex flex-col space-y-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="w-full">
                <div className="w-full aspect-[306/248] rounded-[10px] overflow-hidden mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-[10px] left-[10px] bg-[rgba(21,21,21,0.2)] px-[7px] py-[7px] rounded">
                    <span className="font-inter font-semibold text-[14px] leading-[1.4] text-white">
                      {post.date}
                    </span>
                  </div>
                </div>
                <a href="#" className="flex items-center font-inter font-semibold text-[16px] xs:text-[18px] leading-[1.4] text-white">
                  {post.title}
                  <ArrowIcon />
                </a>
              </div>
            ))}
          </div>
          
          {/* Tablet Layout (2 columns) */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="w-full mb-6">
                  <div className="w-full aspect-[306/248] rounded-[10px] overflow-hidden mb-4">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-[15px] left-[15px] bg-[rgba(21,21,21,0.2)] px-[7px] py-[7px] rounded">
                      <span className="font-inter font-semibold text-[14px] leading-[1.4] text-white">
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <a href="#" className="flex items-center font-inter font-semibold text-[18px] leading-[1.4] text-white">
                    {post.title.length > 40 ? `${post.title.substring(0, 40)}...` : post.title}
                    <ArrowIcon />
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Layout (Complex grid) */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              {/* Left Column - Small Posts */}
              <div className="col-span-3 flex flex-col gap-6">
                <div className="w-full">
                  <div className="w-full aspect-[306/248] rounded-[10px] overflow-hidden mb-4">
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
                  <a href="#" className="flex items-center font-inter font-semibold text-[18px] lg:text-[20px] leading-[1.4] text-white">
                    Prenatal Care with Yoga
                    <ArrowIcon />
                  </a>
                </div>
                
                <div className="w-full">
                  <div className="w-full aspect-[306/248] rounded-[10px] overflow-hidden mb-4">
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
                  <a href="#" className="flex items-center font-inter font-semibold text-[18px] lg:text-[20px] leading-[1.4] text-white">
                    Prenatal Care with Yoga
                    <ArrowIcon />
                  </a>
                </div>
              </div>
              
              {/* Center Column - Large Post */}
              <div className="col-span-6">
                <div className="w-full">
                  <div className="w-full aspect-[574/598] rounded-[10px] overflow-hidden mb-4">
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
                  <a href="#" className="flex items-center font-inter font-semibold text-[18px] lg:text-[20px] leading-[1.4] text-white">
                    Sleepless Nights? How Yoga Can Help You Find Rest and Recharge Your Life
                    <ArrowIcon />
                  </a>
                </div>
              </div>
              
              {/* Right Column - Small Posts */}
              <div className="col-span-3 flex flex-col gap-6">
                <div className="w-full">
                  <div className="w-full aspect-[306/248] rounded-[10px] overflow-hidden mb-4">
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
                  <a href="#" className="flex items-center font-inter font-semibold text-[18px] lg:text-[20px] leading-[1.4] text-white">
                    Prenatal Care with Yoga
                    <ArrowIcon />
                  </a>
                </div>
                
                <div className="w-full">
                  <div className="w-full aspect-[306/248] rounded-[10px] overflow-hidden mb-4">
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
                  <a href="#" className="flex items-center font-inter font-semibold text-[18px] lg:text-[20px] leading-[1.4] text-white">
                    Prenatal Care with Yoga
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
