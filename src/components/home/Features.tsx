import React from 'react';
import { Clock, Users, Heart, Target } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Flexible Timings',
    description: 'Choose from 100s of classes daily.'
  },
  {
    icon: Users,
    title: 'Expert Indian Teachers',
    description: 'Choose best teachers for your specific needs.'
  },
  {
    icon: Heart,
    title: 'Lifetime Bond',
    description: 'Talk your heart out privately post session.'
  },
  {
    icon: Target,
    title: 'Accountability',
    description: 'Build accountability with our systematic approach'
  }
];

const Features = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Elevate Yoga?</h2>
          <p className="text-gray-600">
            Flexibility in your poses, accountability in your progress — we've got you covered!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;