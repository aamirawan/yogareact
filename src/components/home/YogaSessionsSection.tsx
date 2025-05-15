import { useState } from 'react';
import session1 from '../../assets/images/one_session.png';
import session2 from '../../assets/images/one_session_2.png';
import session3 from '../../assets/images/one_session_3.png';

const YogaSessionsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sessions = [
    {
      id: 1,
      title: '1:1 Sessions',
      instructor: 'Aishwarya Mondody',
      image: session1,
    },
    {
      id: 2,
      title: '1:1 Sessions',
      instructor: 'Aishwarya Mondody',
      image: session2,
    },
    {
      id: 3,
      title: '1:1 Sessions',
      instructor: 'Aishwarya Mondody',
      image: session3,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sessions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sessions.length) % sessions.length);
  };

  return (
    <section className="relative w-full bg-[#121212] py-20 overflow-hidden">
      {/* Top Text Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 flex justify-between items-start mb-14">
        <div className="max-w-[420px]">
          <h2 className="font-inter text-white text-[46px] leading-[56px] font-semibold">
            Flexible, Impactful, Proven!
          </h2>
        </div>
        <div className="max-w-[480px]">
          <p className="font-inter text-[#D2D1D1] text-[16px] leading-[24px]">
            Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full flex justify-center items-center mb-16">
        <div className="flex max-w-[1440px] mx-auto justify-center items-center">
          {/* Previous Slide (Partially Visible) */}
          <div 
            className={`relative transition-all duration-500 ease-in-out mr-4 opacity-80`}
            style={{
              width: '320px',
              height: '260px',
              transform: 'scale(0.95)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7)), url(${sessions[(currentSlide + sessions.length - 1) % sessions.length].image})`,
              }}
            />
            <div className="absolute bottom-0 left-0 w-full p-6 text-left z-10">
              <h3 className="font-inter font-semibold text-white text-[20px] mb-1">
                {sessions[(currentSlide + sessions.length - 1) % sessions.length].title}
              </h3>
              <p className="font-inter text-white text-[14px] opacity-90">
                {sessions[(currentSlide + sessions.length - 1) % sessions.length].instructor}
              </p>
            </div>
          </div>
          
          {/* Current Slide (Center, Larger) */}
          <div 
            className={`relative transition-all duration-500 ease-in-out z-10 mx-4`}
            style={{
              width: '580px',
              height: '340px',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7)), url(${sessions[currentSlide].image})`,
              }}
            />
            <div className="absolute bottom-0 left-0 w-full p-6 text-left z-10">
              <h3 className="font-inter font-semibold text-white text-[28px] mb-1">
                {sessions[currentSlide].title}
              </h3>
              <p className="font-inter text-white text-[16px] opacity-90">
                {sessions[currentSlide].instructor}
              </p>
            </div>
          </div>
          
          {/* Next Slide (Partially Visible) */}
          <div 
            className={`relative transition-all duration-500 ease-in-out ml-4 opacity-80`}
            style={{
              width: '320px',
              height: '260px',
              transform: 'scale(0.95)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.7)), url(${sessions[(currentSlide + 1) % sessions.length].image})`,
              }}
            />
            <div className="absolute bottom-0 left-0 w-full p-6 text-left z-10">
              <h3 className="font-inter font-semibold text-white text-[20px] mb-1">
                {sessions[(currentSlide + 1) % sessions.length].title}
              </h3>
              <p className="font-inter text-white text-[14px] opacity-90">
                {sessions[(currentSlide + 1) % sessions.length].instructor}
              </p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-5 mb-10">
        <button
          onClick={prevSlide}
          className="w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center shadow-md"
          aria-label="Previous slide"
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
          className="w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center shadow-md"
          aria-label="Next slide"
        >
          <svg
            className="transform rotate-180"
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
      </div>
    </section>
  );
};

export default YogaSessionsSection;