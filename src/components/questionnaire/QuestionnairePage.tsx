import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import yogaImage from '../../assets/images/yogagirl4.jpg';

interface FormData {
  focus: string[];
  healthConcerns: string[];
  sessionType: string[];
}

const QuestionnairePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    focus: [],
    healthConcerns: [],
    sessionType: []
  });
  
  const totalSteps = 3;
  
  const handleOptionChange = (category: keyof FormData, option: string) => {
    setFormData(prev => {
      const currentOptions = prev[category];
      
      // Toggle option selection
      if (currentOptions.includes(option)) {
        return {
          ...prev,
          [category]: currentOptions.filter(item => item !== option)
        };
      } else {
        return {
          ...prev,
          [category]: [...currentOptions, option]
        };
      }
    });
  };
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit questionnaire
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      navigate('/account/login');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Send data to backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/preferences/questionnaire`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(formData)
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to save questionnaire data');
      }
      
      // Mark questionnaire as completed locally
      localStorage.setItem('questionnaireCompleted', 'true');
      
      // Navigate back to home
      navigate('/groupclasses');
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      setSubmitError('Failed to save your preferences. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Focus options for step 1
  const focusOptions = [
    { id: 'sleep', label: 'Sleep' },
    { id: 'core', label: 'Core' },
    { id: 'strength', label: 'Strength' },
    { id: 'flexibility', label: 'Flexibility' },
    { id: 'calm', label: 'Calm' },
    { id: 'workout', label: 'Workout' },
    { id: 'basics', label: 'Basics' },
    { id: 'prenatal', label: 'Prenatal' },
    { id: 'postnatal', label: 'Postnatal' },
    { id: 'bake-care', label: 'Bake care' },
    { id: 'energy', label: 'Energy' },
    { id: 'womens-health', label: "Women's Health" }
  ];
  
  // Health concerns for step 3
  const healthOptions = [
    { id: 'pcos-pcod', label: 'PCOS/PCOD' },
    { id: 'anxiety-depression', label: 'Anxiety/Depression' },
    { id: 'back-pain-joint-issues', label: 'Back pain/Joint Issues' },
    { id: 'weight-management', label: 'Weight Management' },
    { id: 'sleep-issues-insomnia', label: 'Sleep Issues/Insomnia' },
    { id: 'other', label: 'Other' }
  ];
  
  // Session type preferences for step 2
  const sessionOptions = [
    { id: 'personalised-sessions', label: 'Personalised Sessions' },
    { id: 'group-classes', label: 'Group Classes' },
    { id: 'either', label: 'Either' }
  ];
  
  return (
    <div className="min-h-screen bg-white font-['Inter'] flex flex-col md:flex-row">
      {/* Left side image */}
      <div 
        className="hidden md:block md:w-[44%] relative bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${yogaImage})`, 
          borderRadius: '0px 10px 10px 0px' 
        }}
      />
      
      {/* Right side content */}
      <div className="w-full md:w-[56%] p-8 md:p-12 lg:p-16">
        {/* Back button and question number */}
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center justify-center w-6 h-6 mr-2 text-[#545454]"
          >
            {currentStep > 1 && (
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9141 19.5312L4.88281 12.5L11.9141 5.46875" stroke="#545454" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.85938 12.5H20.1172" stroke="#545454" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
              </svg>              
            )}
          </button>
          <span className="font-['Inter'] text-[16px] text-[#545454]">Question {currentStep}/{totalSteps}</span>
        </div>
        
        {/* Step 1: Focus */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-[27px] font-semibold text-black font-['Inter']">What would you like to focus on?</h2>
            <p className="text-[#545454] text-[18px] font-['Inter']">Pick as many as you'd like</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {focusOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleOptionChange('focus', option.id)}
                  className={`relative flex items-center justify-center h-[56px] border rounded-[10px] cursor-pointer transition-all ${
                    formData.focus.includes(option.id) 
                      ? 'border-[#121212] bg-white' 
                      : 'border-[#D5D5D5] hover:border-gray-400'
                  }`}
                >
                  {formData.focus.includes(option.id) && (
                    <div className="absolute -top-3 -left-3 w-[31px] h-[31px] bg-[#121212] rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <span className="text-[18px] text-[#545454] font-['Inter']">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 2: Session Type */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-[27px] font-semibold text-black font-['Inter']">Preferred Yoga Session Type</h2>
            <p className="text-[#545454] text-[18px] font-['Inter']">Choose all that apply and we'll help you find your match.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {sessionOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleOptionChange('sessionType', option.id)}
                  className={`relative flex items-center justify-center h-[56px] border rounded-[10px] cursor-pointer transition-all ${
                    formData.sessionType.includes(option.id) 
                      ? 'border-[#121212] bg-white' 
                      : 'border-[#D5D5D5] hover:border-gray-400'
                  }`}
                >
                  {formData.sessionType.includes(option.id) && (
                    <div className="absolute -top-3 -left-3 w-[31px] h-[31px] bg-[#121212] rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <span className="text-[18px] text-[#545454] font-['Inter']">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 3: Health Concerns */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-[27px] font-semibold text-black font-['Inter']">Do you have specific health concerns or goals?</h2>
            <p className="text-[#545454] text-[18px] font-['Inter']">Move the slider to your best estimate for each practice.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {healthOptions.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleOptionChange('healthConcerns', option.id)}
                  className={`relative flex items-center justify-center h-[56px] border rounded-[10px] cursor-pointer transition-all ${
                    formData.healthConcerns.includes(option.id) 
                      ? 'border-[#121212] bg-white' 
                      : 'border-[#D5D5D5] hover:border-gray-400'
                  }`}
                >
                  {formData.healthConcerns.includes(option.id) && (
                    <div className="absolute -top-3 -left-3 w-[31px] h-[31px] bg-[#121212] rounded-full flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L3.5 6.5L1 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  <span className="text-[18px] text-[#545454] font-['Inter']">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Error message */}
        {submitError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {submitError}
          </div>
        )}
        
        {/* Navigation buttons */}
        <div className="mt-12 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="w-[185px] h-[55px] border border-[#121212] rounded-[10px] text-[#121212] font-semibold font-['Poppins'] text-[16px]"
          >
            Skip
          </button>
          
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="w-[185px] h-[55px] bg-[#121212] text-white rounded-[10px] font-semibold font-['Poppins'] text-[16px]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              currentStep === totalSteps ? 'Submit' : 'Next'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
