import { useState } from 'react';

const FaqSection = () => {
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "What is our ambition?",
      answer: "We are driven by the idea of tearing down walls and making things simple and efficient. Passionate about people and convinced of the importance of fit in the work context, we have been dreaming of crafting innovative solutions that have a lasting impact in the executive hiring space. We aim at bringing a business competitive edge to our clients through innovative Executive Search practices. We aim at bringing to candidates the best approaches and technologies to help them find the right opportunities and engage the right hiring leaders."
    },
    {
      id: 2,
      question: "Where we come from?",
      answer: ""
    },
    {
      id: 3,
      question: "Where we come from?",
      answer: ""
    }
  ];

  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState(1);

  // Toggle FAQ open/close
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? 0 : id);
  };

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1224px] mx-auto px-4 sm:px-5 md:px-6 lg:px-0">
        {/* Section Title */}
        <h2 className="font-inter font-medium text-[28px] sm:text-[36px] md:text-[42px] lg:text-[52px] leading-[1.2] sm:leading-[1.3] md:leading-[1.4] lg:leading-[76px] text-center text-[#121212] mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          Got Questions? We've Got Answers
        </h2>
        
        {/* FAQ Accordion */}
        <div className="w-full mx-auto">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-4 sm:mb-6 md:mb-8 lg:mb-[40px]">
              {/* FAQ Question */}
              <div 
                className={`relative w-full ${openFaq === faq.id ? 'rounded-t-[10px]' : 'rounded-[10px]'} border border-[#B6B6B6] bg-white cursor-pointer`}
                onClick={() => toggleFaq(faq.id)}
              >
                <div className="flex justify-between items-center p-3 sm:p-4 md:p-[20px]">
                  <h3 className="font-inter font-semibold text-[16px] sm:text-[17px] md:text-[18px] leading-[1.3] sm:leading-[22px] text-[#121212] pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-[10px] sm:w-[11px] h-[5px] sm:h-[6px] transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`}>
                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5.5 5L10 1" stroke="#B6B6B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* FAQ Answer */}
              {openFaq === faq.id && (
                <div className="w-full p-3 sm:p-4 md:p-[20px] pt-0 bg-white border border-t-0 border-[#B6B6B6] rounded-b-[10px]">
                  <p className="font-inter font-normal text-[14px] sm:text-[15px] md:text-[16px] leading-[1.4] sm:leading-[131.59%] text-[#121212]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Additional Questions Input Fields 
        <div className="absolute w-[1073px] left-[183px] top-[490px]">
          <div className="w-full h-[56px] bg-[#F9F9F9] border border-[#CFD0D7] rounded-[10px] mb-[39px]">
            <div className="flex justify-between items-center p-[11px]">
              <span className="font-inter font-semibold text-[18px] leading-[22px] text-black">
                You can add something
              </span>
              <div className="w-[11px] h-[6px] transform -rotate-90">
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5L10 1" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-full h-[56px] bg-[#F9F9F9] border border-[#CFD0D7] rounded-[10px]">
            <div className="flex justify-between items-center p-[11px]">
              <span className="font-inter font-semibold text-[18px] leading-[22px] text-black">
                You can add something
              </span>
              <div className="w-[11px] h-[6px] transform -rotate-90">
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5.5 5L10 1" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FaqSection;
