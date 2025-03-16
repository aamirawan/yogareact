import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
//import LiveClasses from './components/LiveClasses';
//import About from './components/About';
//import FAQs from './components/FAQs';
import Contact from './components/contact/ContactUs';
import NotFound from './components/NotFound';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import TeacherProfile from './components/teacher/TeacherProfile';
import ClassManagement from './components/teacher/ClassManagement';
import TeacherCalendar from './components/teacher/TeacherCalendar';
import IssueReporting from './components/teacher/IssueReporting';

function App() {
  const location = useLocation();
  const hideHeaderFooter = [
    '/account/register', 
    '/teacher',
    '/teacher/classes',
    '/teacher/profile',
    '/teacher/calendar',
    '/teacher/issues'
  ].includes(location.pathname);

  useEffect(() => {
    // Store the current pathname
    const currentPath = location.pathname;
    const lastPath = sessionStorage.getItem('lastPath');
    
    if (lastPath && lastPath !== currentPath) {
      // Clear the stored path before reloading
      sessionStorage.removeItem('lastPath');
      // Reload the page
      window.location.href = currentPath;
      return;
    }
      
    // Save the current path
    sessionStorage.setItem('lastPath', currentPath);
  }, [location.pathname]);
  
  return (
    <div className="min-h-screen">
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/login" element={<Login />} />
        {/* <Route path="/live-classes" element={<LiveClasses />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/faqs" element={<FAQs />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/teacher" element={<TeacherDashboard />}>
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="classes" element={<ClassManagement />} />
          <Route path="calendar" element={<TeacherCalendar />} />
          <Route path="issues" element={<IssueReporting />} />
        </Route>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;