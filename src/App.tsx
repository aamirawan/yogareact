import React from 'react';
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

function App() {
  const location = useLocation();
  const hideHeaderFooter = ['/account/register'].includes(location.pathname);

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
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;