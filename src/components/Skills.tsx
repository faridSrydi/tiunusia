import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Globe, Database } from 'lucide-react';

const skills = [
  {
    icon: Code,
    title: 'Programming',
    description: 'The ability to write code in various programming languages (such as Python, Java, C++, and JavaScript). Programmers create applications, software, and algorithms to solve specific problems.'
  },
  {
    icon: Shield,
    title: 'Cyber Security',
    description: 'Cyber Security is the practice of protecting computer systems, networks, and data from attack, damage, or unauthorized access. The main goal of cybersecurity is to maintain the confidentiality, integrity, and availability of information.'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Skills in building and maintaining websites. This involves knowledge of HTML, CSS, JavaScript, and frameworks such as React or Angular.'
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'The ability to analyze and interpret big data using statistical tools and techniques. This includes the use of programming languages such as R or Python for data analysis.'
  }
];

const Skills = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
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
         👨‍💻Skills 
        </motion.h2>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <skill.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;