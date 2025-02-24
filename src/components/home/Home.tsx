import React from 'react';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import LiveClasses from './LiveClasses';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Features />
      <LiveClasses />
    </main>
  );
};

export default Home;