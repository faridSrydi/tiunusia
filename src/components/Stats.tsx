import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCircle2, UserCircle } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Total Team', value: 30 },
  { icon: UserCircle2, label: 'Boy', value: 23 },
  { icon: UserCircle, label: 'Girl', value: 7 }
];

const Stats = () => {
  return (
    <div className="bg-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg p-8 text-center shadow-lg"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                className="block text-4xl font-bold text-gray-800"
              >
                {stat.value}
              </motion.span>
              <span className="text-gray-600">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;