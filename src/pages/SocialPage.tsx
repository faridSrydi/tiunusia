import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Youtube, Github, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import TikTokIcon from '../components/icons/TiktokIcon';

const SocialPage = () => {
  const socialPlatforms = [
    {
      name: 'Instagram',
      icon: Instagram,
      username: '@tiunusia_ofc24',
      url: 'https://instagram.com/tiunusia_ofc24',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      followers: '2K+',
      content: 'Campus life, events, coding, and student activities'
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      username: '@tiunusia',
      url: 'https://tiktok.com/@tiunusia',
      color: 'bg-black dark:bg-gray-800',
      followers: '1K+',
      content: 'Fun educational content and campus moments'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      username: '@tiunusia',
      url: 'https://youtube.com/@tiunusia',
      color: 'bg-red-600',
      followers: '8K+',
      content: 'Lectures, tutorials, and campus events'
    },
    {
      name: 'GitHub',
      icon: Github,
      username: '@tiunusia',
      url: 'https://github.com/tiunusia',
      color: 'bg-gray-900 dark:bg-gray-700',
      followers: '500+',
      content: 'Student projects and open-source contributions'
    }
  ];

  const contactInfo = {
    address: 'Jl. Parung Hijau Desa Tegal Jampang Hambulu, Pd. Udik, Kec. Kemang, Kabupaten Bogor, Jawa Barat 16310',
    phone: '+62 896 52411 405',
    email: 'tiunusia@gmail.com'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
        <motion.h2
          className="text-4xl font-bold text-center text-black mb-8"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
          🔔Connect With Us 
        </motion.h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">Stay updated with our latest news and events across all platforms</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`${platform.color} p-6 text-white`}>
                <platform.icon className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
                <p className="text-lg opacity-90">{platform.username}</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{platform.followers}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{platform.content}</p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  <span>Visit Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <p className="text-gray-600 dark:text-gray-300">{contactInfo.address}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <p className="text-gray-600 dark:text-gray-300">{contactInfo.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <p className="text-gray-600 dark:text-gray-300">{contactInfo.email}</p>
              </div>
            </div>
            <div className="h-64 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2532313117895!2d106.72748490976991!3d-6.489584563419597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c2c979f8fde1%3A0x22c79b849bac3918!2sUNUSIA%20Kampus%20B!5e0!3m2!1sid!2sid!4v1731387221150!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialPage;