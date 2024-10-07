// components/TestimonialCard.jsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TestimonialCard = ({ testimonial }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [screenSize, setScreenSize] = useState('sm');

  useEffect(() => {
    // Detect touch devices
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Handle screen resize for responsive design
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setScreenSize('xl');
      } else if (width >= 1024) {
        setScreenSize('lg');
      } else if (width >= 768) {
        setScreenSize('md');
      } else {
        setScreenSize('sm');
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Initialize
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Define padding and border-radius based on screen size for consistency
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const roundedClasses = {
    sm: 'rounded-[36px]',
    md: 'rounded-[40px]',
    lg: 'rounded-[44px]',
    xl: 'rounded-[50px]',
  };

  return (
    <motion.div
      className={`
        relative z-20 cursor-pointer group
        ${paddingClasses[screenSize]}
        ${roundedClasses[screenSize]}
        bg-[#242424] bg-opacity-30
        backdrop-blur-lg
        shadow-lg
        overflow-hidden
        flex flex-col justify-between
        transition-transform duration-300
        hover:scale-105
        glassmorphism-hover
      `}
      whileHover={isTouchDevice ? {} : { scale: 1.02 }}
    >

      {/* Content Container */}
      <div className="relative z-20 flex flex-col justify-between h-full">
        {/* Profile Section */}
        <div className="flex items-center mb-5">
          <Image
            src={testimonial.imgUrl}
            alt={testimonial.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover select-none pointer-events-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="ml-4">
            <h3 className="text-lg text-white font-bold">{testimonial.name}</h3>
            <div className="flex items-center">
              <a
                href={testimonial.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white opacity-60 hover:underline"
              >
                {testimonial.username}
              </a>
              {/* Checkmark Icon */}
              <Image
                src="/checkmark.svg"
                alt="Verified"
                width={13}
                height={13}
                className="h-[12px] w-[12px] ml-2 mt-0.5 select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>

        {/* Testimonial Text */}
        <p className="text-sm text-white">{testimonial.text}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
