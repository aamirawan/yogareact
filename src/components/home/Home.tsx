import React, { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Features from './Features';
import LiveClasses from './LiveClasses';
import YogaClasses from './YogaClasses';
import YogaBar from './YogaBar';
import YogaPackages from './YogaPackages';

const Home = () => {
  // Add any necessary JavaScript functionality here
  useEffect(() => {
    // This would be where we'd add the carousel/slider functionality
    // that was in the original jQuery code
    const handleDescriptionHover = () => {
      const descriptions = document.querySelectorAll('.yoga-info-description');
      
      descriptions.forEach(description => {
        const overlay = description.nextElementSibling as HTMLElement;
        const icon = description.querySelector('.description-svg') as SVGElement;
        
        description.addEventListener('mouseenter', () => {
          if (overlay) overlay.style.display = 'block';
          if (icon) icon.classList.add('rotate');
        });
        
        description.addEventListener('mouseleave', () => {
          if (overlay) overlay.style.display = 'none';
          if (icon) icon.classList.remove('rotate');
        });
        
        if (overlay) {
          overlay.addEventListener('mouseenter', () => {
            overlay.style.display = 'block';
            if (icon) icon.classList.add('rotate');
          });
          
          overlay.addEventListener('mouseleave', () => {
            overlay.style.display = 'none';
            if (icon) icon.classList.remove('rotate');
          });
        }
      });
    };
    
    // Call the function after a short delay to ensure DOM is ready
    setTimeout(handleDescriptionHover, 500);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Features />
      <LiveClasses />
      <YogaClasses />
      <YogaPackages />
      <YogaBar />
    </main>
  );
};

export default Home;