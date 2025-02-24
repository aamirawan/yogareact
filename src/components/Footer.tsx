import React from 'react';
import { Instagram, Youtube, Mail } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
  tag?: string;
}

const elevateLinks: FooterLink[] = [
  { label: 'Live Classes', href: '/live-classes', tag: 'Join Now' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Reviews', href: 'https://www.trustpilot.com/review/theelevateyoga.com' }
];

const inspirationLinks: FooterLink[] = [
  { label: 'Book A Free Trial', href: '/free-trial' },
  { label: 'Group Yoga', href: '/group-yoga', tag: 'Popular' },
  { label: '1-1 Private Sessions', href: '/private-sessions' },
  { label: 'Video Tutorials', href: 'https://www.youtube.com/@TheElevateYoga/shorts' },
  { label: 'Elevate Teachers', href: '/teachers' }
];

const resourceLinks: FooterLink[] = [
  { label: 'Blog', href: '/blog' },
  { label: 'Events', href: '/events' },
  { label: 'Help Center', href: '/help' },
  { label: 'Fair Use Policy', href: '/fair-use-policy' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms Of Use', href: '/terms-of-use' }
];

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <a href="/" className="block mb-6">
                <img 
                  src="https://theelevateyoga.com/cdn/shop/files/8.png?v=1729424532"
                  alt="The Elevate Yoga"
                  className="h-12"
                />
              </a>
              <form className="relative mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-12 py-3 border border-gray-300 rounded-md"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail size={16} />
                </span>
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                >
                  →
                </button>
              </form>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/theelevateyoga/" className="text-gray-600 hover:text-gray-900">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@TheElevateYoga" className="text-gray-600 hover:text-gray-900">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Elevate Links */}
            <div>
              <h3 className="font-medium text-base mb-4">Elevate</h3>
              <ul className="space-y-3">
                {elevateLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 flex items-center">
                      {link.label}
                      {link.tag && (
                        <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                          {link.tag}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inspiration Links */}
            <div>
              <h3 className="font-medium text-base mb-4">Inspiration</h3>
              <ul className="space-y-3">
                {inspirationLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900 flex items-center">
                      {link.label}
                      {link.tag && (
                        <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                          {link.tag}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="font-medium text-base mb-4">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-600 hover:text-gray-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium mb-2">Elevate Yoga By India For The World.</h4>
              <p className="text-gray-600">On A Mission To Make Authentic Yoga, A Part Of Each Household.</p>
            </div>
            <div className="lg:text-right">
              <p className="text-sm text-gray-600">
                © 2025 Elevate Yoga By Inspiro Digital. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;