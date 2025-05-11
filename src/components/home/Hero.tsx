import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

interface StatProps {
  count: string;
  description: string;
}

const Stat = ({ count, description }: StatProps) => (
  <div className="flex items-center gap-4">
    <Star className="w-6 h-6 text-yellow-400" />
    <div>
      <h3 className="text-xl font-bold">{count}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const handleEmailRedirect = () => {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    if (emailInput && emailInput.checkValidity()) {
      navigate(`/account/register?email=${encodeURIComponent(emailInput.value.trim())}`);
    } else if (emailInput) {
      emailInput.reportValidity();
    }
  };

  return (
    <div className="yoga-home">
      <div className="container section-my">
        <div className="yoga-home-inner">
          <div className="yoga-home-content">
            <h1>Virtual Yoga Retreat At Your Home!</h1>
            <h3>Flexible. Impactful. Proven</h3>
            
            <div className="email-register">
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email address" 
                required 
              />
              <button 
                type="button" 
                className="btn-started sf__btn sf__btn-primary" 
                onClick={handleEmailRedirect}
              >
                Get Free Trial Now 
                <span>
                  <img 
                    src="//theelevateyoga.com/cdn/shop/t/2/assets/next.png?v=138201501430627803641735756455" 
                    alt="Yoga Icon" 
                    loading="lazy"
                  />
                </span>
              </button>
            </div>
            
            <div className="yoga-home-icons">
              <div className="yoga-home-icons-details">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/stars.png?v=65688492886048927591728575162" 
                  alt="Yoga Icon"
                />
                <div className="yoga-home-icons-box">
                  <h3>100+</h3>
                  <p>Teachers To Choose From</p>
                </div>
              </div>

              <div className="yoga-home-icons-details">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/stars.png?v=65688492886048927591728575162" 
                  alt="Yoga Icon"
                />
                <div className="yoga-home-icons-box">
                  <h3>10000+</h3>
                  <p>Customers Served Globally</p>
                </div>
              </div>

              <div className="yoga-home-icons-details">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/stars.png?v=65688492886048927591728575162" 
                  alt="Yoga Icon"
                />
                <div className="yoga-home-icons-box">
                  <h3>100%</h3>
                  <p>Authentic Indian Yoga At Your Home</p>
                </div>
              </div>
            </div>
          </div>

          <div className="yoga-home-cards">
            <div className="item">
              <div className="yoga-home-cards-inner card-1">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/16.jpg?v=59073738268833690821730537348" 
                  alt="Yoga Categories"
                />
                <div className="yoga-card-detail">
                  <h3>Yoga For Flexibility</h3>
                  <p>Stretch. Strengthen. Flow.</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="yoga-home-cards-inner card-2">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/18.jpg?v=21357819047595179131730537381" 
                  alt="Yoga Categories"
                />
                <div className="yoga-card-detail">
                  <h3>Yoga For PCOS/PCOD</h3>
                  <p>Regulate. Revive. Empower.</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="yoga-home-cards-inner card-3">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/19.jpg?v=41283869152918568081730537404" 
                  alt="Yoga Categories"
                />
                <div className="yoga-card-detail">
                  <h3>Yoga For Strength</h3>
                  <p>Power. Stability. Endurance.</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="yoga-home-cards-inner card-4">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/17.jpg?v=46748586731799426491730537426" 
                  alt="Yoga Categories"
                />
                <div className="yoga-card-detail">
                  <h3>Yoga For Weight Loss</h3>
                  <p>Burn. Sculpt. Transform</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="yoga-home-cards-inner card-5">
                <img 
                  src="//theelevateyoga.com/cdn/shop/t/2/assets/15.jpg?v=81354124020126935431730537452" 
                  alt="Yoga Categories"
                />
                <div className="yoga-card-detail">
                  <h3>Yoga For Stress Relief</h3>
                  <p>Calm. Balance. Unwind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;