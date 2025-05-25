import React from 'react';
import { useNavigate } from 'react-router-dom';
import yogaImage from '../../assets/images/17.png';

interface QuestionnairePopupProps {
  onClose: () => void;
  onLater: () => void;
}

const QuestionnairePopup: React.FC<QuestionnairePopupProps> = ({ onClose, onLater }) => {
  const navigate = useNavigate();

  const handleDoIt = () => {
    // Navigate to questionnaire page
    navigate('/questionnaire');
    onClose();
  };

  const handleLater = () => {
    onLater();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[10px] overflow-hidden w-full max-w-[816px] flex flex-col md:flex-row relative">
        {/* Image Section - Left side on desktop, top on mobile */}
        <div className="md:w-[46.69%] relative bg-[#5B1E1E] h-64 md:h-auto">
          <div className="absolute inset-0 bg-cover bg-center" style={{
            backgroundImage: `url(${yogaImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}></div>
        </div>
        
        {/* Content Section - Right side on desktop, bottom on mobile */}
        <div className="md:w-[53.31%] p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-[35px] font-semibold mb-4 text-black font-['Inter'] leading-[53px]">
            Let's personalize your practice.
          </h2>
          
          <p className="text-[#545454] text-[18px] mb-6 font-['Inter'] leading-[27px]">
            Help us create a routine that fits your needs by answering <span className="font-semibold">3 quick questions</span>.
          </p>
          
          <div className="space-y-4 mt-auto">
            <button 
              onClick={handleDoIt}
              className="w-full py-[9.68px] px-[19.36px] bg-[#121212] text-white border border-[#121212] rounded-[8.07px] font-normal text-[16px] font-['Inter'] hover:bg-gray-900 transition-colors"
            >
              Let's do it
            </button>
            
            <button 
              onClick={handleLater}
              className="w-full py-[9.68px] px-[19.36px] border border-[#121212] text-[#121212] rounded-[8.07px] font-normal text-[16px] font-['Inter'] hover:bg-gray-50 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePopup;
