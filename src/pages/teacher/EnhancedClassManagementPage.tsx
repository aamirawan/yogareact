import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedClassManagement from '../../components/teacher/EnhancedClassManagement';

const EnhancedClassManagementPage = () => {
  const navigate = useNavigate();

  // Check if user is logged in and is a teacher
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      navigate('/login', { replace: true });
    } else if (user.role !== 'teacher') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <EnhancedClassManagement />
    </div>
  );
};

export default EnhancedClassManagementPage;
