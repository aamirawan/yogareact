// Yoga Retreat Section component
import yogaInstructor1 from '../../assets/images/yogagirl2.jpg';
import yogaInstructor2 from '../../assets/images/yogagirl4.jpg';
import yogaInstructor3 from '../../assets/images/yogagirl5.jpg';
import community1 from '../../assets/images/17.png';
import community2 from '../../assets/images/18.jpg';
import community3 from '../../assets/images/19.jpg';


const YogaRetreatSection = () => {
  return (
    <section className="relative w-full h-[1431px] bg-white">
      <div className="max-w-[1440px] mx-auto relative h-full">
        {/* Section Title */}
        <h2 className="absolute w-[727px] h-[125px] left-[100px] top-[103px] font-inter font-medium text-[52px] leading-[76px] text-[#121212]">
          Yoga Retreat Like Experience<br />
          Anytime, Anywhere!
        </h2>
        
        {/* Grid Layout */}
        <div className="absolute top-[282px] left-[100px] grid grid-cols-3 gap-[27px]">
          {/* Left Column - Large Image */}
          <div className="col-span-1">
            <div className="w-[395px] h-[546px] border border-[#CFCFCF] rounded-[10px] overflow-hidden">
              <img 
                src={yogaInstructor1} 
                alt="Yoga instructor with mat" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Box Below */}
            <div className="w-[395px] h-[217px] mt-[31px] border border-[#CFCFCF] rounded-[10px] flex flex-col items-center justify-center p-[20px]">
              <p className="w-[301px] text-center font-inter font-normal text-[16px] leading-[23px] text-[#121212]">
                Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
              </p>
              <p className="mt-[13px] font-inter font-semibold text-[16px] leading-[23px] text-[#121212]">
                Aishwariya
              </p>
            </div>
          </div>
          
          {/* Middle Column */}
          <div className="col-span-1">
            {/* Top Text Box */}
            <div className="w-[395px] h-[217px] border border-[#CFCFCF] rounded-[10px] flex flex-col items-center justify-center p-[20px]">
              <p className="w-[301px] text-center font-inter font-normal text-[16px] leading-[23px] text-[#121212]">
                Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
              </p>
              <p className="mt-[13px] font-inter font-semibold text-[16px] leading-[23px] text-[#121212]">
                Aishwariya
              </p>
            </div>
            
            {/* Large Image Below */}
            <div className="w-[395px] h-[546px] mt-[31px] border border-[#CFCFCF] rounded-[10px] overflow-hidden">
              <img 
                src={yogaInstructor2} 
                alt="Yoga instructor in pose" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="col-span-1">
            {/* Large Image */}
            <div className="w-[395px] h-[546px] border border-[#CFCFCF] rounded-[10px] overflow-hidden">
              <img 
                src={yogaInstructor3} 
                alt="Yoga instructor in nature" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Box Below */}
            <div className="w-[395px] h-[217px] mt-[31px] border border-[#CFCFCF] rounded-[10px] flex flex-col items-center justify-center p-[20px]">
              <p className="w-[301px] text-center font-inter font-normal text-[16px] leading-[23px] text-[#121212]">
                Choose from 100s of classes daily. Choose your best teachers for your own specific needs.
              </p>
              <p className="mt-[13px] font-inter font-semibold text-[16px] leading-[23px] text-[#121212]">
                Aishwariya
              </p>
            </div>
          </div>
        </div>
        
        {/* Community Highlights Section */}
        <div className="absolute left-[100px] top-[1130px] w-[1239px]">
          {/* All content in one line */}
          <div className="flex items-center">
            {/* Text Section */}
            <div className="mr-[120px]">
              <h3 className="font-inter font-medium text-[27px] leading-[39px] text-[#121212]">
                Community Highlights
              </h3>
              <p className="font-inter font-medium text-[25px] leading-[37px] text-[#E32552]">
                #Virtual Yoga
              </p>
            </div>
            
            {/* Instagram Posts Row */}
            <div className="flex items-center space-x-4">
              {/* Instagram Post 1 */}
              <div className="w-[196px] h-[196px] border border-[#CFCFCF] rounded-[9px] overflow-hidden flex-shrink-0">
                <img 
                  src={community3} 
                  alt="Community highlight 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Instagram Post 2 */}
              <div className="w-[196px] h-[196px] border border-[#CFCFCF] rounded-[9px] overflow-hidden flex-shrink-0">
                <img 
                  src={community2} 
                  alt="Community highlight 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Instagram Post 3 */}
              <div className="w-[196px] h-[196px] border border-[#CFCFCF] rounded-[9px] overflow-hidden flex-shrink-0">
                <img 
                  src={community1} 
                  alt="Community highlight 3" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Instagram Icon */}
              <div className="w-[196px] h-[196px] bg-[#121212] border border-[#CFCFCF] rounded-[9px] flex items-center justify-center flex-shrink-0">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 4.6C29.1 4.6 29.9 4.6 32.3 4.7C34.6 4.8 35.9 5.2 36.8 5.6C37.9 6.1 38.8 6.7 39.6 7.6C40.5 8.4 41.1 9.3 41.6 10.4C41.9 11.3 42.3 12.6 42.4 14.9C42.5 17.3 42.5 18.1 42.5 24.2C42.5 30.3 42.5 31.1 42.4 33.5C42.3 35.8 41.9 37.1 41.6 38C41.1 39.1 40.5 40 39.6 40.8C38.8 41.7 37.9 42.3 36.8 42.8C35.9 43.1 34.6 43.5 32.3 43.6C29.9 43.7 29.1 43.7 23 43.7C16.9 43.7 16.1 43.7 13.7 43.6C11.4 43.5 10.1 43.1 9.2 42.8C8.1 42.3 7.2 41.7 6.4 40.8C5.5 40 4.9 39.1 4.4 38C4.1 37.1 3.7 35.8 3.6 33.5C3.5 31.1 3.5 30.3 3.5 24.2C3.5 18.1 3.5 17.3 3.6 14.9C3.7 12.6 4.1 11.3 4.4 10.4C4.9 9.3 5.5 8.4 6.4 7.6C7.2 6.7 8.1 6.1 9.2 5.6C10.1 5.3 11.4 4.9 13.7 4.8C16.1 4.7 16.9 4.6 23 4.6ZM23 0C16.8 0 16 0 13.5 0.1C11.1 0.2 9.4 0.6 7.9 1.2C6.3 1.8 5 2.6 3.7 4C2.3 5.3 1.5 6.6 0.9 8.2C0.3 9.7 0 11.4 0 13.8C0 16.3 0 17.1 0 23.3C0 29.5 0 30.3 0.1 32.8C0.2 35.2 0.6 36.9 1.2 38.4C1.8 40 2.6 41.3 4 42.6C5.3 44 6.6 44.8 8.2 45.4C9.7 46 11.4 46.3 13.8 46.4C16.3 46.5 17.1 46.5 23.3 46.5C29.5 46.5 30.3 46.5 32.8 46.4C35.2 46.3 36.9 45.9 38.4 45.3C40 44.7 41.3 43.9 42.6 42.5C44 41.2 44.8 39.9 45.4 38.3C46 36.8 46.3 35.1 46.4 32.7C46.5 30.2 46.5 29.4 46.5 23.2C46.5 17 46.5 16.2 46.4 13.7C46.3 11.3 45.9 9.6 45.3 8.1C44.7 6.5 43.9 5.2 42.5 3.9C41.2 2.5 39.9 1.7 38.3 1.1C36.8 0.5 35.1 0.2 32.7 0.1C30.3 0 29.5 0 23.3 0H23Z" fill="white"/>
                  <path d="M23 11.3C16.5 11.3 11.3 16.6 11.3 23C11.3 29.4 16.6 34.7 23 34.7C29.4 34.7 34.7 29.4 34.7 23C34.7 16.6 29.5 11.3 23 11.3ZM23 30.1C19.1 30.1 15.9 26.9 15.9 23C15.9 19.1 19.1 15.9 23 15.9C26.9 15.9 30.1 19.1 30.1 23C30.1 26.9 26.9 30.1 23 30.1Z" fill="white"/>
                  <path d="M35 13.7C36.4 13.7 37.6 12.5 37.6 11.1C37.6 9.7 36.4 8.5 35 8.5C33.6 8.5 32.4 9.7 32.4 11.1C32.4 12.5 33.6 13.7 35 13.7Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaRetreatSection;
