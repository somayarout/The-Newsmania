import React from 'react';
import {TrendingUp} from 'lucide-react';

const Footer = () => {
  return (
     <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Company Info */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-blue-500 rounded-xl p-2">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">The Newsmania</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    A web app to explore global news by country and category in one place.
                  </p>
                </div>
    
                {/* License Information */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">License</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>MIT License</p>
                    <p>Open Source Software</p>
                    <p>
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        View License Terms
                      </a>
                    </p>
                  </div>
                </div>
    
                {/* Legal Links */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Legal</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    </p>
                    <p>
                      <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </p>
                    <p>
                      <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </p>
                    <p>
                      <a href="#" className="hover:text-white transition-colors">DMCA Notice</a>
                    </p>
                  </div>
                </div>
    
                {/* Contact */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>somayaranjanr86@gmail.com</p>
                    <p>+91 9330953205</p>
                    <p>
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Help Center
                      </a>
                    </p>
                  </div>
                </div>
              </div>
    
              {/* Copyright Section */}
              <div className="border-t border-gray-700 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-gray-400">
                      © {new Date().getFullYear()} The Newsmania. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      The Newsmania™ is a trademark of The Newsmania Inc.
                    </p>
                  </div>
                  
                  <div className="text-center md:text-right">
                    <p className="text-xs text-gray-500">
                      Licensed under the MIT License. This software is provided "as is" without warranty of any kind.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Product prices and availability are subject to change. External links are provided for convenience only.
                    </p>
                  </div>
                </div>
    
                {/* Attribution */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Made with ❤️ using React, JavaScript, and Tailwind CSS
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Icons provided by Lucide React. Design inspired by modern e-commerce platforms.
                  </p>
                </div>
              </div>
            </div>
          </footer>
  );
};

export default Footer;