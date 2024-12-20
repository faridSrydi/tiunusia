import React from 'react';
import { motion } from 'framer-motion';

import { FaBullseye, FaLightbulb } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="py-16 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
      <motion.h2
          className="text-4xl font-bold text-center text-black mb-10"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        >
        ❓About 
        </motion.h2>        <div className="bg-white rounded-lg shadow-xl p-8">
          <p className="text-lg font-medium text-gray-700 mb-6">
            Welcome to the Informatics Engineering Department at Nahdlatul Ulama University. 
            We are dedicated to nurturing the next generation of technology innovators and leaders.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our program combines theoretical knowledge with practical experience, 
            preparing students for the dynamic world of technology and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Mission Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <div className="flex items-center mb-4">
                <FaBullseye className="text-blue-500 text-2xl mr-2" />
                <h2 className="text-xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-700">
                To educate and empower students with cutting-edge technology skills 
                and knowledge, fostering innovation and excellence in the field of 
                informatics engineering.
              </p>
            </div>
            {/* Vision Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
              <div className="flex items-center mb-4">
                <FaLightbulb className="text-yellow-500 text-2xl mr-2" />
                <h2 className="text-xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-700">
                To become a leading institution in informatics engineering education, 
                producing graduates who are innovative, ethical, and ready to contribute 
                to the technological advancement of society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
