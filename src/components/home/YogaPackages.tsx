import React, { useState } from 'react';
import Slider from 'react-slick';
import { PhoneCall, ArrowRight } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './YogaPackages.css';

interface Package {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  subtitle: string;
  features: string[];
  sellingPlan: string;
  sellingPlanGroup: string;
  productId: string;
  type: string;
  credit: number;
  interval: number;
}

const YogaPackages = () => {
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [showCallbackModal, setShowCallbackModal] = useState(false);

  const allPackages: Package[] = [
    {
      id: '45820509782228',
      title: 'Balanced Progress Package – (6) 1:1 Sessions Monthly',
      originalPrice: 179.99,
      discountedPrice: 149.99,
      subtitle: 'Next Level Flow',
      features: [
        '3 personalized 1:1 sessions per month',
        'Reschedule anytime before 4 hours.',
        'Monthly wellness consultation with nutrition plan',
        '2 free passes to events or masterclasses'
      ],
      sellingPlan: '3633414356',
      sellingPlanGroup: '7e0891b75b9374689665d82e9eb09e30c420b449',
      productId: '8681146548436',
      type: 'one to one',
      credit: 9,
      interval: 30
    },
    {
      id: '45820507914452',
      title: 'Complete Wellness Package – (12) 1:1 Sessions Monthly',
      originalPrice: 349.99,
      discountedPrice: 249.99,
      subtitle: 'The First Step',
      features: [
        '1 personalized 1:1 session per month',
        'Reschedule anytime before 4 hours.',
        '1 free pass to an event or masterclass.'
      ],
      sellingPlan: '3633381588',
      sellingPlanGroup: '0e716dd4a80bd7fcecbe1c12af9b38652a1bc398',
      productId: '8681144746196',
      type: 'one to one',
      credit: 7,
      interval: 60
    },
    {
      id: '45820511682772',
      title: 'Foundational Growth Package – (3) 1:1 Sessions Monthly',
      originalPrice: 99.99,
      discountedPrice: 79.99,
      subtitle: 'Unlimited Bliss',
      features: [
        '12 personalized 1:1 sessions per month',
        'Reschedule anytime before 4 hours.',
        'Monthly wellness consultation with nutrition plan',
        '3 free passes to events or masterclasses',
        'Goal-setting support and reminders for accountability.',
        'Exclusive 25% Off + Early access to Elevate Yoga retreats.',
        'Get Featured Brand Ambassador Tag'
      ],
      sellingPlan: '3633447124',
      sellingPlanGroup: 'd33dcd1331edfc496f3df714622c77244881bf5d',
      productId: '8681146712276',
      type: 'one to one',
      credit: 4,
      interval: 80
    },
    {
      id: '45820512764116',
      title: 'Group Sessions - Monthly Unlimited',
      originalPrice: 199.99,
      discountedPrice: 79.99,
      subtitle: '1 Month Plan',
      features: [
        'Group Sessions - Monthly Unlimited',
        'Personalize your schedule',
        'Guidance from our expert trainers'
      ],
      sellingPlan: '3633479892',
      sellingPlanGroup: '7579f3b193e0d3e941b3a018fcf3478b68b0fdaa',
      productId: '8681146974420',
      type: 'group',
      credit: 0,
      interval: 30
    }
  ];

  const handlePackageClick = (packageId: string) => {
    setActivePackage(packageId);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '0px',
    arrows: true,
    swipeToSlide: true,
    spacing: 20,
    className: 'yoga-packages-slider',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="yoga-packages">
      <div className="container section-my" style={{ maxWidth: '1280px', padding: '0 20px' }}>
        <div className="yoga-packages-head">
          <h1>Get Worlds First Customized 1-1 Yoga Sessions</h1>
          <div 
            className="yoga-packages-head-inner product-popupyoga"
            onClick={() => setShowCallbackModal(true)}
          >
            <div className="yoga-packages-head-phone">
              <div className="circle">
                <PhoneCall className="w-6 h-6" />
              </div>
            </div>
            <div className="yoga-packages-head-detail">
              <div className="content">
                <h3>Want to know our plans better?</h3>
                <p>Request a callback</p>
              </div>
              <ArrowRight className="w-6 h-6" />
            </div>
          </div>
        </div>

        <Slider {...settings}>
          {allPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`yoga-packages-card ${activePackage === pkg.id ? 'active' : ''}`} 
              onClick={() => handlePackageClick(pkg.id)}>
              <h4>{pkg.title}</h4>
              <span>
                <span className="original-price">₹{pkg.originalPrice}</span>
                <span className="discounted-price">₹{pkg.discountedPrice}</span>
              </span>
              <div className="yoga-packages-card-detail">
                <h4>{pkg.subtitle}</h4>
                <div className="yoga-packages-card-detail">
                  {pkg.features.map((feature, index) => (
                    <p key={index}>{feature}</p>
                  ))}
                </div>
              </div>
              <div className="btn-div">
                <button className="sf__btn sf__btn-primary btn-pay" onClick={() => console.log('Pay now clicked for package:', pkg.id)}>
                  Pay now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Callback Modal */}
      {showCallbackModal && (
        <div className="modal product-popup-video reels-popup product-popup-yogaopen is-visible">
          <div 
            className="modal-overlay product-popupyoga"
            onClick={() => setShowCallbackModal(false)}
          ></div>
          <div className="modal-wrapper modal-transition">
            <div className="modal-header">
              <h3>Request a Callback</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowCallbackModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Our team will contact you shortly</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaPackages;