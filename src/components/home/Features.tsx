import React from 'react';
import { Clock, Users, Heart, Target } from 'lucide-react';

const Features = () => {
  return (
    <div className="yoga-program">
      <div className="container section-my">
        <div className="yoga-program-head">
          <h1>Why Elevate Yoga?</h1>
          <p>Flexibility in your poses, accountability in your progress — we've got you covered!</p>
        </div>
        <div className="yoga-program-inner-top"> 
          <div className="yoga-program-inner">
            <div className="yoga-program-card item">
              <img 
                src="//theelevateyoga.com/cdn/shop/t/2/assets/calendar-clock.png?v=44451263487079153731728467983" 
                alt="Yoga Cards"
              />
              <h3>Flexible Timings</h3>
              <p>Choose from 100s of classes daily.</p>
            </div>
            <div className="yoga-program-card item">
              <img 
                src="//theelevateyoga.com/cdn/shop/t/2/assets/4.png?v=171883068119718631931731758058" 
                alt="Yoga Cards"
              />
              <h3>Expert Indian Teachers</h3>
              <p>Choose best teachers for your specific needs.</p>
            </div>
            <div className="yoga-program-card item">
              <img 
                src="//theelevateyoga.com/cdn/shop/t/2/assets/9.png?v=182298882104520313201731758084" 
                alt="Yoga Cards"
              />
              <h3>Lifetime Bond</h3>
              <p>Talk your heart out privately post session.</p>
            </div>
            <div className="yoga-program-card item">
              <img 
                src="//theelevateyoga.com/cdn/shop/t/2/assets/22.png?v=30201277287878936461731758835" 
                alt="Yoga Cards"
              />
              <h3>Accountability</h3>
              <p>Build accountability with our systematic approach</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;