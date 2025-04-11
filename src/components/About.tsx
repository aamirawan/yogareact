import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Elevate, your premier destination for authentic Indian yoga, delivered directly to your home. Our mission is to make traditional yoga practices accessible to everyone, everywhere.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            With over 100+ certified yoga teachers from India, we bring you the most authentic and comprehensive yoga experience. Our instructors are carefully selected for their expertise, experience, and dedication to the ancient practice of yoga.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're a beginner taking your first steps into yoga or an advanced practitioner looking to deepen your practice, our diverse range of classes caters to all levels and goals.
          </p>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Why Choose Elevate?</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-700">
              <li>100+ Certified Indian Yoga Teachers</li>
              <li>Flexible Class Schedules</li>
              <li>Personalized Attention</li>
              <li>Traditional Indian Yoga Practices</li>
              <li>Modern Teaching Methods</li>
              <li>Affordable Pricing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 