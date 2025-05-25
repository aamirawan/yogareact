import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface QuestionnaireContextType {
  showQuestionnairePopup: boolean;
  setShowQuestionnairePopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleLater: () => void;
  resetQuestionnaireState: () => void;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const QuestionnaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
  const [showQuestionnairePopup, setShowQuestionnairePopup] = useState<boolean>(false);
  
  // Check if the popup is paused
  const isPopupPaused = (): boolean => {
    const pausedUntil = localStorage.getItem('questionnairePausedUntil');
    if (!pausedUntil) return false;
    
    const pauseTime = parseInt(pausedUntil, 10);
    return Date.now() < pauseTime;
  };
  
  // Handle "Maybe Later" button click
  const handleLater = () => {
    // Pause for 24 hours
    const pauseUntil = Date.now() + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    localStorage.setItem('questionnairePausedUntil', pauseUntil.toString());
    setShowQuestionnairePopup(false);
  };
  
  // Reset questionnaire state (for testing or admin purposes)
  const resetQuestionnaireState = () => {
    localStorage.removeItem('questionnaireCompleted');
    localStorage.removeItem('questionnairePausedUntil');
  };
  
  // Check questionnaire status from the backend
  const checkQuestionnaireStatus = async () => {
    if (!isAuthenticated || !localStorage.getItem('token')) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/preferences/questionnaire/status`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.completed) {
          localStorage.setItem('questionnaireCompleted', 'true');
          return true;
        } else {
          localStorage.removeItem('questionnaireCompleted');
          return false;
        }
      }
    } catch (error) {
      console.error('Error checking questionnaire status:', error);
    }
    
    // Fallback to local storage if API call fails
    return localStorage.getItem('questionnaireCompleted') === 'true';
  };
  
  useEffect(() => {
    // Only show popup for logged-in users with role 'student'
    if (isAuthenticated && userRole === 'student') {
      // If popup is paused, don't show it
      if (isPopupPaused()) {
        return;
      }
      
      // Check questionnaire status from backend
      const checkStatus = async () => {
        const completed = await checkQuestionnaireStatus();
        
        // If not completed and not paused, show popup after a small delay
        if (!completed && !isPopupPaused()) {
          const timer = setTimeout(() => {
            setShowQuestionnairePopup(true);
          }, 1000);
          
          return () => clearTimeout(timer);
        }
      };
      
      checkStatus();
    }
  }, [isAuthenticated, userRole]);
  
  return (
    <QuestionnaireContext.Provider 
      value={{ 
        showQuestionnairePopup, 
        setShowQuestionnairePopup,
        handleLater,
        resetQuestionnaireState
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};
