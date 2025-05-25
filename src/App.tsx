import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header2';
import Footer from './components/common/Footer';
import SimpleFooter from './components/common/SimpleFooter';
import { AuthProvider } from './context/AuthContext';
import ToastProvider from './context/ToastContext';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import QuestionnairePopupContainer from './components/common/QuestionnairePopupContainer';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
  </div>
);

// Lazy load components for better performance
const Home = lazy(() => import('./components/home/Home')); // Using the new homepage
const Register = lazy(() => import('./components/auth/Register'));
const Login = lazy(() => import('./components/auth/Login'));
const Contact = lazy(() => import('./components/contact/ContactUs'));
const NotFound = lazy(() => import('./components/NotFound'));

// Teacher components
const TeacherDashboard = lazy(() => import('./components/teacher/TeacherDashboard'));
const TeacherProfile = lazy(() => import('./components/teacher/TeacherProfile'));
const EnhancedClassManagement = lazy(() => import('./components/teacher/EnhancedClassManagement'));
const TeacherCalendar = lazy(() => import('./components/teacher/TeacherCalendar'));
const IssueReporting = lazy(() => import('./components/teacher/IssueReporting'));
const EnhancedClassManagementPage = lazy(() => import('./pages/teacher/EnhancedClassManagementPage'));

// Student components
const StudentDashboard = lazy(() => import('./components/student/StudentDashboard'));
const BrowseClasses = lazy(() => import('./components/student/BrowseClasses'));
const GroupClasses = lazy(() => import('./components/student/GroupClasses'));
const Subscription = lazy(() => import('./components/student/Subscription'));
const TeacherReviews = lazy(() => import('./components/student/TeacherReviews'));
const OneOnOneBooking = lazy(() => import('./components/student/OneOnOneBooking'));
const QuestionnairePage = lazy(() => import('./components/questionnaire/QuestionnairePage'));

// Admin components
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const StaticPages = lazy(() => import('./components/admin/pages/StaticPages'));
const BlogPosts = lazy(() => import('./components/admin/pages/BlogPosts'));
const Packages = lazy(() => import('./components/admin/pages/Packages'));
const Teachers = lazy(() => import('./components/admin/pages/Teachers'));
const Students = lazy(() => import('./components/admin/pages/Students'));
const Classes = lazy(() => import('./components/admin/pages/Classes'));
const Orders = lazy(() => import('./components/admin/pages/Orders'));

function App() {
  const location = useLocation();

  const hideHeaderFooter = [
    '/account/login',    '/account/register',
    '/new',
    '/teacher',
    '/teacher/classes',
    '/teacher/profile',
    '/teacher/calendar',
    '/teacher/issues',
    '/teacher/enhanced-classes',
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

  // Use React Router's useEffect to handle navigation side effects if needed
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <AuthProvider>
      <QuestionnaireProvider>
        <ToastProvider>
          <div className="min-h-screen">
          {!hideHeaderFooter && <Header />}
          <QuestionnairePopupContainer />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="groupclasses" element={<GroupClasses />} />
            <Route path="one-on-one" element={<OneOnOneBooking />} />
            <Route path="/questionnaire" element={<QuestionnairePage />} />
          {/* Teacher Routes */}
          <Route path="/teacher" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }>
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="classes" element={<EnhancedClassManagement />} />
            <Route path="calendar" element={<TeacherCalendar />} />
            <Route path="issues" element={<IssueReporting />} />
          </Route>
          <Route path="/teacher/enhanced-classes" element={
            <ProtectedRoute allowedRoles={['teacher']}>
              <EnhancedClassManagementPage />
            </ProtectedRoute>
          } />
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
              <Route path="orders" element={<ProtectedRoute allowedRoles={['admin']}><Orders /></ProtectedRoute>} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="students" element={<Students />} />
            </Route>
            </Routes>
          </Suspense>
          {!hideHeaderFooter && (
            location.pathname === '/' ? <Footer /> : <SimpleFooter />
          )}
        </div>
        </ToastProvider>
      </QuestionnaireProvider>
    </AuthProvider>
  );
}

// Make sure this is properly exported as default
export default App;