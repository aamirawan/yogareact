import React from 'react';

const LiveClasses = () => {
  return (
    <div className="yoga-info">
      <div className="container section-my">
        <div className="yoga-info-inner">
          <div className="yoga-info-content">
            <h1>Not Your Regular Pre-Recorded Sessions.</h1>
            <p>Experience yoga like never before with real-time, interactive sessions led by India's finest teachers. Whether it's 1:1 personalized guidance or dynamic group classes, every moment is crafted for you. Feel the energy, ask questions, and transform your practice—because yoga is meant to be alive.</p>
            <div className="yoga-info-content-buttons">
              <a href="/principles" className="sf__btn sf__btn-primary btn-learn">Read our principles</a>
              <a href="/about" className="sf__btn sf__btn-primary btn-started">About us</a>
            </div>
          </div>
          <div className="yoga-info-img">
            <img 
              src="//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-yoga-community.webp?v=37142923678384723321732717709" 
              alt="Yoga Home"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;