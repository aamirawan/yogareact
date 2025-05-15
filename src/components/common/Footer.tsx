// Footer component for the homepage
import logo from "../../assets/images/logo.webp";

const Footer = () => {
  return (
    <footer className="w-full relative bg-white pt-[50px] pb-[30px]">
      {/* Marquee Section at the top */}
      <div className="absolute w-full left-0 top-0 overflow-hidden bg-[#121212] text-white py-4">
        <div className="relative">
          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center text-sm font-medium">
              <span>Home</span>
              <span className="mx-2">•</span>
              <span>Yoga Anywhere</span>
              <span className="mx-2">•</span>
              <span>Yoga Anytime</span>
              <span className="mx-2">•</span>
              <span>Yoga For All Ages</span>
              <span className="mx-2">•</span>
              <span>Mental Health Awareness</span>
              <span className="mx-2">•</span>
              <span>24/7 Support</span>
              <span className="mx-2">•</span>
              <span>Flexible Timings</span>
              <span className="mx-2">•</span>
              <span>Yoga For Healing</span>
              <span className="mx-2">•</span>
              <span>Meditation</span>
              <span className="mx-2">•</span>
              <span>Pranayama</span>
              <span className="mx-2">•</span>
              <span>Home</span>
              <span className="mx-2">•</span>
              <span>Yoga Anywhere</span>
              <span className="mx-2">•</span>
              <span>Yoga Anytime</span>
              <span className="mx-2">•</span>
              <span>Yoga For All Ages</span>
              <span className="mx-2">•</span>
              <span>Mental Health Awareness</span>
              <span className="mx-2">•</span>
              <span>24/7 Support</span>
              <span className="mx-2">•</span>
              <span>Flexible Timings</span>
              <span className="mx-2">•</span>
              <span>Yoga For Healing</span>
              <span className="mx-2">•</span>
              <span>Meditation</span>
              <span className="mx-2">•</span>
              <span>Pranayama</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-[100px] flex justify-between mt-[70px]">
        {/* Left section with newsletter */}
        <div className="w-[438px]">
          <h3 className="font-bold text-[16px] leading-[23px] text-[#121212]">
            Stay in the Know
          </h3>
          
          <p className="w-full mt-[25px] font-normal text-[16px] leading-[27px] text-[#121212]">
            Subscribe to our newsletter and be the first to know about upcoming product launches, sales, and giveaways!
          </p>
          
          {/* Email input and submit button */}
          <div className="w-full mt-[25px] flex">
            <input 
              type="email" 
              placeholder="Enter Email" 
              className="w-[299px] h-[50px] px-4 bg-white border border-[#E9E9E9] rounded-l-[6px] text-[16px] text-[#7D7D7D]"
            />
            <button className="w-[132px] h-[50px] bg-[#121212] rounded-r-[8px] text-white font-medium text-[14px]">
              Submit
            </button>
          </div>
          
          {/* Social media icons */}
          <div className="flex items-center gap-[26px] mt-[36px]">
            {/* Facebook */}
            <a href="#" aria-label="Facebook">
              <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.84172 17.5V9.53H8.49172L8.89172 6.5H5.84172V4.5C5.84172 3.5 6.14172 2.5 7.64172 2.5H9.04172V0.14C8.74172 0.0975 7.74172 0 6.64172 0C4.34172 0 2.84172 1.49 2.84172 4.23V6.5H0.141724V9.53H2.84172V17.5H5.84172Z" fill="#121212"/>
              </svg>
            </a>
            
            {/* Twitter */}
            <a href="#" aria-label="Twitter">
              <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1417 2C17.4417 2.35 16.7417 2.58 15.9417 2.69C16.7417 2.16 17.3417 1.32 17.6417 0.31C16.9417 0.81 16.1417 1.16 15.3417 1.36C14.6417 0.5 13.6417 0 12.5417 0C10.4417 0 8.74172 1.81 8.74172 4.06C8.74172 4.38 8.74172 4.69 8.84172 5C5.74172 4.81 3.04172 3.19 1.14172 0.75C0.841724 1.38 0.641724 2.16 0.641724 2.94C0.641724 4.43 1.34172 5.75 2.44172 6.5C1.84172 6.5 1.24172 6.3 0.741724 6V6.06C0.741724 8.11 2.04172 9.85 3.74172 10.17C3.44172 10.27 3.04172 10.31 2.74172 10.31C2.44172 10.31 2.24172 10.31 1.94172 10.24C2.44172 11.94 3.94172 13.16 5.74172 13.16C4.34172 14.28 2.64172 14.94 0.841724 14.94C0.541724 14.94 0.341724 14.94 0.0417236 14.88C1.84172 16.06 3.94172 16.75 6.24172 16.75C12.5417 16.75 16.0417 10.38 16.0417 4.75C16.0417 4.57 16.0417 4.38 16.0417 4.25C16.8417 3.63 17.4417 2.88 18.1417 2Z" fill="#121212"/>
              </svg>
            </a>
            
            {/* Instagram */}
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.98 1.8C12.64 1.8 12.96 1.8 14.04 1.86C15.06 1.92 15.66 2.1 16.08 2.28C16.62 2.5 17.04 2.78 17.4 3.2C17.82 3.56 18.04 3.98 18.26 4.52C18.38 4.94 18.56 5.54 18.62 6.56C18.68 7.64 18.68 7.96 18.68 10.62C18.68 13.28 18.68 13.6 18.62 14.68C18.56 15.7 18.38 16.3 18.26 16.72C18.04 17.26 17.76 17.68 17.4 18.04C17.04 18.4 16.62 18.68 16.08 18.9C15.66 19.02 15.06 19.2 14.04 19.26C12.96 19.32 12.64 19.32 9.98 19.32C7.32 19.32 7 19.32 5.92 19.26C4.9 19.2 4.3 19.02 3.88 18.9C3.34 18.68 2.92 18.4 2.56 18.04C2.2 17.68 1.92 17.26 1.7 16.72C1.58 16.3 1.4 15.7 1.34 14.68C1.28 13.6 1.28 13.28 1.28 10.62C1.28 7.96 1.28 7.64 1.34 6.56C1.4 5.54 1.58 4.94 1.7 4.52C1.92 3.98 2.2 3.56 2.56 3.2C2.92 2.84 3.34 2.56 3.88 2.34C4.3 2.22 4.9 2.04 5.92 1.98C7 1.8 7.32 1.8 9.98 1.8ZM9.98 0C7.26 0 6.94 0 5.8 0.06C4.72 0.12 4 0.3 3.34 0.54C2.68 0.84 2.08 1.2 1.54 1.8C0.94 2.34 0.64 2.94 0.34 3.6C0.1 4.26 0 4.98 0.04 6.06C0 7.2 0 7.52 0 10.24C0 12.96 0 13.28 0.04 14.42C0.1 15.5 0.28 16.22 0.52 16.88C0.82 17.54 1.18 18.14 1.78 18.68C2.32 19.28 2.92 19.58 3.58 19.88C4.24 20.12 4.96 20.22 6.04 20.18C7.18 20.22 7.5 20.22 10.22 20.22C12.94 20.22 13.26 20.22 14.4 20.18C15.48 20.12 16.2 19.94 16.86 19.7C17.52 19.4 18.12 19.04 18.66 18.44C19.26 17.9 19.56 17.3 19.86 16.64C20.1 15.98 20.2 15.26 20.16 14.18C20.2 13.04 20.2 12.72 20.2 10C20.2 7.28 20.2 6.96 20.16 5.82C20.1 4.74 19.92 4.02 19.68 3.36C19.38 2.7 19.02 2.1 18.42 1.56C17.88 0.96 17.28 0.66 16.62 0.36C15.96 0.12 15.24 0.02 14.16 0.06C13.02 0 12.7 0 9.98 0Z" fill="#121212"/>
                <path d="M9.98 4.98C7.14 4.98 4.86 7.26 4.86 10.1C4.86 12.94 7.14 15.22 9.98 15.22C12.82 15.22 15.1 12.94 15.1 10.1C15.1 7.26 12.82 4.98 9.98 4.98ZM9.98 13.42C8.18 13.42 6.66 11.9 6.66 10.1C6.66 8.3 8.18 6.78 9.98 6.78C11.78 6.78 13.3 8.3 13.3 10.1C13.3 11.9 11.78 13.42 9.98 13.42Z" fill="#121212"/>
                <path d="M15.28 6.06C15.9866 6.06 16.56 5.48657 16.56 4.78C16.56 4.07343 15.9866 3.5 15.28 3.5C14.5734 3.5 14 4.07343 14 4.78C14 5.48657 14.5734 6.06 15.28 6.06Z" fill="#121212"/>
              </svg>
            </a>
            
            {/* LinkedIn */}
            <a href="#" aria-label="LinkedIn">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9417 0H1.94172C1.34172 0 0.941724 0.4 0.941724 1V17C0.941724 17.6 1.34172 18 1.94172 18H17.9417C18.5417 18 18.9417 17.6 18.9417 17V1C18.9417 0.4 18.5417 0 17.9417 0ZM5.94172 15H3.24172V6.7H5.94172V15ZM4.54172 5.6C3.64172 5.6 2.94172 4.9 2.94172 4C2.94172 3.1 3.64172 2.4 4.54172 2.4C5.44172 2.4 6.14172 3.1 6.14172 4C6.14172 4.9 5.44172 5.6 4.54172 5.6ZM16.0417 15H13.3417V10.9C13.3417 9.9 13.3417 8.6 11.9417 8.6C10.5417 8.6 10.3417 9.7 10.3417 10.8V15H7.64172V6.7H10.2417V7.8H10.2717C10.6717 7.2 11.4417 6.5 12.6417 6.5C15.3417 6.5 16.0417 8.3 16.0417 10.6V15Z" fill="#121212"/>
              </svg>
            </a>
          </div>
        </div>
      
        {/* Right section with links */}
        <div className="w-[524px]">
          <div className="flex justify-between w-full">
            <div className="flex flex-col">
              <h3 className="font-bold text-[16px] text-[#121212] mb-6">Elevate</h3>
              <ul className="flex flex-col space-y-4">
                <li className="flex items-center">
                  <a href="#" className="text-[14px] text-[#121212]">Live Classes</a>
                  <span className="ml-2 px-2 py-0.5 bg-[#E32552] text-white text-[10px] rounded-[4px]">Join Now</span>
                </li>
                <li><a href="#" className="text-[14px] text-[#121212]">About Us</a></li>
                <li><a href="#" className="text-[14px] text-[#121212]">Contact Us</a></li>
                <li><a href="#" className="text-[14px] text-[#121212]">FAQs</a></li>
                <li><a href="#" className="text-[14px] text-[#121212]">Reviews</a></li>
              </ul>
            </div>
            
            <div className="flex flex-col">
              <h3 className="font-bold text-[16px] text-[#121212] mb-6">Inspiration</h3>
              <ul className="flex flex-col space-y-4">
                <li><a href="#" className="text-[14px] text-[#121212]">Book A Free Trial</a></li>
                <li className="flex items-center">
                  <a href="#" className="text-[14px] text-[#121212]">Group Yoga</a>
                  <span className="ml-2 px-2 py-0.5 bg-[#121212] text-white text-[10px] rounded-[4px]">Popular</span>
                </li>
                <li><a href="#" className="text-[14px] text-[#121212]">1-1 Private Sessions</a></li>
                <li><a href="#" className="text-[14px] text-[#121212]">Video Tutorials</a></li>
                <li><a href="#" className="text-[14px] text-[#121212]">Elevate Teachers</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      

      
      {/* Bottom section with logo and copyright */}
      <div className="w-full mt-[60px] py-[40px] bg-[#F9FAFA]">
        <div className="container mx-auto px-[100px] flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <img src={logo} alt="Elevate Yoga Logo" className="h-[50px]" />
          </div>
          
          <p className="text-center text-[14px] text-[#121212] mt-4">
            Elevate Yoga By India For The World.<br />
            On A Mission To Make Authentic Yoga, A Part Of Each Household.
          </p>
          
          <p className="text-center text-[12px] text-[#121212] mt-4">
            © 2025 Elevate Yoga By Inspiro Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
