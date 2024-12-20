import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-indigo-600 flex items-center justify-center z-50"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Code className="w-16 h-16 text-white" />
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;