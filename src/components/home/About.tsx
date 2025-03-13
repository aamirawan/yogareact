import React from 'react';

const About = () => {
  return (
    <div className="yoga-intro">
      <div className="container section-my">
        <div className="yoga-intro-inner">
          <div className="yoga-intro-image">
            <div className="yoga-intro-image-inner product-popupfirst">
              <img 
                src="//theelevateyoga.com/cdn/shop/t/2/assets/About-Elevate-Yoga2.webp?v=31328731293021709391732711411" 
                alt="Yoga Intro" 
              /> 
            </div>
          </div>
          <div className="yoga-intro-content">
            <span>Yoga Retreat Like Experience Anytime, Anywhere!</span>
            <h3>Authentic Indian Yoga At Your Place</h3>
            <p>Experience authentic Indian yoga wherever you are with our flexible, tailored classes. Join live sessions from the comfort of your home, anytime that suits you. Practice on your schedule and connect with expert teachers who bring traditional wisdom, strength & flexibility to modern life.</p>
            <div className="yoga-intro-content-button">
              <a href="/principles" className="sf__btn sf__btn-primary btn-learn">Read our principles</a>
              <a href="/about" className="sf__btn sf__btn-primary btn-started">About us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;