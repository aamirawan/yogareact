import React from 'react';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import QuestionnairePopup from './QuestionnairePopup';

const QuestionnairePopupContainer: React.FC = () => {
  const { showQuestionnairePopup, setShowQuestionnairePopup, handleLater } = useQuestionnaire();

  // If popup shouldn't be shown, render nothing
  if (!showQuestionnairePopup) return null;

  return (
    <QuestionnairePopup 
      onClose={() => setShowQuestionnairePopup(false)}
      onLater={handleLater}
    />
  );
};

export default QuestionnairePopupContainer;
