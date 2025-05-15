
// Header is now handled by App.tsx
import PromoBanner from '../common/PromoBanner';
import HeroSection from './HeroSection';
import TrustpilotReviews from './TrustpilotReviews';
import AuthenticYogaSection from './AuthenticYogaSection';
import YogaInstructorsSection from './YogaInstructorsSection';
import YogaSessionsSection from './YogaSessionsSection';
import YogaPlansSection from './YogaPlansSection';
import YogaRetreatSection from './YogaRetreatSection';
import BlogSection from './BlogSection';
import FaqSection from './FaqSection';
import YogaRetreatExperienceSection from './YogaRetreatExperienceSection';
// Footer is now handled by App.tsx

const Home = () => {
  return (
    <div className="w-full font-inter">
      {/* Header is now in App.tsx */}
      
      {/* Promo Banner */}
      <PromoBanner 
        message="Join Group Sessions Monthly Unlimited!" 
        buttonText="Buy Now" 
        buttonLink="/packages"
      />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Trustpilot Reviews */}
      <TrustpilotReviews />
      
      {/* Authentic Indian Yoga Section */}
      <div className="mt-10">
        <AuthenticYogaSection />
      </div>
      
      {/* Yoga Instructors Section */}
      <YogaInstructorsSection />
      
      {/* Yoga Sessions Section */}
      <YogaSessionsSection />
      
      {/* Yoga Plans Section */}
      <YogaPlansSection />
      
      {/* Yoga Retreat Section */}
      <YogaRetreatSection />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* FAQ Section */}
      <FaqSection />
      
      {/* Yoga Retreat Experience Section */}
      <YogaRetreatExperienceSection />
      
      {/* Footer is now in App.tsx */}
    </div>
  );
};

export default Home;
