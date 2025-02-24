import React from 'react';

const About = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="//theelevateyoga.com/cdn/shop/t/2/assets/About-Elevate-Yoga2.webp?v=31328731293021709391732711411"
              alt="About Elevate Yoga"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
          <div className="space-y-6">
            <span className="text-indigo-600 font-medium">
              Yoga Retreat Like Experience Anytime, Anywhere!
            </span>
            <h3 className="text-3xl font-bold">
              Authentic Indian Yoga At Your Place
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Experience authentic Indian yoga wherever you are with our flexible, tailored classes. 
              Join live sessions from the comfort of your home, anytime that suits you. 
              Practice on your schedule and connect with expert teachers who bring traditional wisdom, 
              strength & flexibility to modern life.
            </p>
            <div className="flex gap-4">
              <a href="/principles" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Read our principles
              </a>
              <a href="/about" className="border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors">
                About us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;