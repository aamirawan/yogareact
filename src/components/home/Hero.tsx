import React from 'react';
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
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Virtual Yoga Retreat At Your Home!
            </h1>
            <h3 className="text-xl text-gray-600">Flexible. Impactful. Proven</h3>
            
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Get Free Trial Now
                <span>→</span>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Stat count="100+" description="Teachers To Choose From" />
              <Stat count="10000+" description="Customers Served Globally" />
              <Stat count="100%" description="Authentic Indian Yoga At Your Home" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['Flexibility', 'PCOS/PCOD', 'Strength', 'Weight Loss', 'Stress Relief'].map((category, index) => (
              <div 
                key={category}
                className={`bg-white p-6 rounded-lg shadow-md ${index === 4 ? 'col-span-2' : ''}`}
              >
                <img 
                  src={`//theelevateyoga.com/cdn/shop/t/2/assets/${index + 15}.jpg`} 
                  alt={`Yoga for ${category}`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold">Yoga For {category}</h3>
                <p className="text-sm text-gray-600">
                  {index === 0 && "Stretch. Strengthen. Flow."}
                  {index === 1 && "Regulate. Revive. Empower."}
                  {index === 2 && "Power. Stability. Endurance."}
                  {index === 3 && "Burn. Sculpt. Transform"}
                  {index === 4 && "Calm. Balance. Unwind."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;