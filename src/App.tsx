import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;