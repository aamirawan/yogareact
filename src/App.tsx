import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
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
import StudentDashboard from './components/student/StudentDashboard';
import BrowseClasses from './components/student/BrowseClasses';
import Subscription from './components/student/Subscription';
import TeacherReviews from './components/student/TeacherReviews';
import OneOnOneBooking from './components/student/OneOnOneBooking';
import AdminDashboard from './components/admin/AdminDashboard';
import StaticPages from './components/admin/pages/StaticPages';
import BlogPosts from './components/admin/pages/BlogPosts';
import Packages from './components/admin/pages/Packages';
import Teachers from './components/admin/pages/Teachers';
import Students from './components/admin/pages/Students';
import Classes from './components/admin/pages/Classes';
import Orders from './components/admin/pages/Orders';

function App() {
  const location = useLocation();

  const hideHeaderFooter = [
    '/account/register', 
    '/teacher',
    '/teacher/classes',
    '/teacher/profile',
    '/teacher/calendar',
    '/teacher/issues',
    '/student',
    '/student/classes',
    '/student/subscription',
    '/student/reviews',
    '/student/one-on-one',
    '/admin',
    '/admin/pages',
    '/admin/blog',
    '/admin/packages',
    '/admin/teachers',
    '/admin/students',
    '/admin/classes',
    '/admin/orders',
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
    <AuthProvider>
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
        {/* Teacher Routes */}
        <Route path="/teacher" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }>
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="classes" element={<ClassManagement />} />
          <Route path="calendar" element={<TeacherCalendar />} />
          <Route path="issues" element={<IssueReporting />} />
        </Route>
        {/* Student Routes */}
        <Route path="/student" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        }>
            <Route path="classes" element={<BrowseClasses />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="reviews" element={<TeacherReviews />} />
            <Route path="one-on-one" element={<OneOnOneBooking />} />
          </Route>
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<StaticPages />} />
            <Route path="pages" element={<StaticPages />} />
            <Route path="blog" element={<BlogPosts />} />
            <Route path="packages" element={<Packages />} />
            <Route path="classes" element={<Classes />} />
            <Route path="orders" element={<Orders />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="students" element={<Students />} />
          </Route>
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
    </AuthProvider>
  );
}

export default App;