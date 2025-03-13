import React from "react";
import { Instagram, Youtube, MessageCircle, User } from 'lucide-react';
import ContactForm from "./ContactForm";
import contactBanner from './contact-banner.svg';

const ElevateContactPage: React.FC = () => {
  return (
      <main className="flex-grow">
        {/* Page Title */}
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">Contact</h1>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <a href="/" className="text-gray-600 hover:text-teal-600">Home</a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">Contact</span>
          </div>
        </div>

        {/* Banner Image */}
        <div className="container mx-auto px-4 py-4">
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={contactBanner}
              alt="Decorative banner"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-2">We would love to hear from you.</h2>
              <p className="text-gray-600 mb-6">
                If you've got great products your making or looking to work with us then drop us a line.
              </p>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-gray-600">D1004 Godrej Horizon, Undri, Pune 411060.</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Information</h3>
                <p className="text-gray-600">+917987501543</p>
                <p className="text-gray-600">support@theelevateyyoga.com</p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-teal-600">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600">
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-teal-600">
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2">We're Open</h3>
                <p className="text-gray-600">Our store has re-opened for shopping, exchanges.</p>
                <p className="text-gray-600">Every day 11am to 7pm</p>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default ElevateContactPage;
