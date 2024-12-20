import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Campus Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">🏢Nahdlatul Ulama Indonesia University</h3>
            <img
              src="https://iili.io/2wiRNX2.jpg"
              alt="Campus"
              className="w-full h-48 object-cover rounded-lg mb-5"
            />
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Jl. Parung, Kec. Kemang, Kabupaten Bogor, Jawa Barat 16310
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                +62 12 588 81926
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                humas@unusia.ac.id
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-indigo-400 transition">About Us</a>
              </li>
              <li>
                <a href="/team" className="hover:text-indigo-400 transition">Our Team</a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-indigo-400 transition">Gallery</a>
              </li>
              <li>
                <a href="/social" className="hover:text-indigo-400 transition">Social Media</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/unuindonesia" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/unusia" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center font-bold">
          <p>&copy; {new Date().getFullYear()} Teknik Informatika | Unusia<br></br>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;