import React from 'react';
import { Clock } from 'lucide-react';

const LiveClasses = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Not Your Regular Pre-Recorded Sessions.</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Experience yoga like never before with real-time, interactive sessions led by India's finest teachers. 
            Whether it's 1:1 personalized guidance or dynamic group classes, every moment is crafted for you. 
            Feel the energy, ask questions, and transform your practice—because yoga is meant to be alive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <a href="/principles" className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors mr-4">
              Read our principles
            </a>
            <a href="/about" className="inline-block border border-indigo-600 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors">
              About us
            </a>
          </div>
          <div>
            <img 
              src="//theelevateyoga.com/cdn/shop/t/2/assets/Elevate-yoga-community.webp?v=37142923678384723321732717709"
              alt="Yoga Community"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClasses;