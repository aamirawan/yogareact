import React from 'react';

const LiveClasses = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Live Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Coming soon content */}
          <div className="col-span-full text-center">
            <p className="text-xl text-gray-600">
              Our live classes schedule will be available soon. Please check back later!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClasses; 