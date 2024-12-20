import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    title: 'Programming Excellence',
    description: 'Master the art of coding with cutting-edge technologies'
  },
  {
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    title: 'Cybersecurity Expertise',
    description: 'Protect digital assets with advanced security practices'
  },
  {
    image: 'https://images.unsplash.com/photo-1488229297570-58520851e868',
    title: 'Machine Learning Innovation',
    description: 'Transform data into intelligent solutions'
  }
];

const Hero = () => {
  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl">{slide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;