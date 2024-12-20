import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    title: 'Programming Lab'
  },
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    title: 'Cybersecurity Center'
  },
  // Add more images as needed
];

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative h-[500px] bg-gray-900">
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-between">
        <button
          className="p-2 m-4 rounded-full bg-white/20 hover:bg-white/40 transition"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">{images[currentIndex].title}</h2>
          <p className="text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
        <button
          className="p-2 m-4 rounded-full bg-white/20 hover:bg-white/40 transition"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default GallerySlider;