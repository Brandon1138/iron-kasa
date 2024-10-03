// components/ServiceCard.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ServiceCard = ({
  service,
  onClick,
  isAnimationComplete,
}) => {
  const { imgUrl, title, sizes } = service;

  // State to manage screen size
  const [screenSize, setScreenSize] = useState('sm');

  useEffect(() => {
    // Function to handle screen resize
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // lg and above
        setScreenSize('lg');
      } else if (width >= 768) {
        // md
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

  // Get image size based on screen size only
  const imageSize = sizes[screenSize] || sizes.sm;

  return (
    <motion.div
      className="
        relative cursor-pointer group
        w-[150px] h-[150px]
        sm:w-[200px] sm:h-[200px]
        md:w-[203px] md:h-[203px]
        lg:w-[270px] lg:h-[270px]
        rounded-[30px]
        sm:rounded-[32px]
        md:rounded-[36px]
        lg:rounded-[44px]
        overflow-hidden
        flex flex-col justify-center items-center
        p-4
        outer-shadow
        glassmorphism
        glassmorphism-hover
      "
      onClick={() => {
        if (isAnimationComplete) onClick();
      }}
      whileHover={{ scale: 1.05 }}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter') onClick();
      }}
      aria-label={`Open details for ${title}`}
    >
      {/* Base Gradient */}
      <div
        className="
          absolute inset-0
          pointer-events-none
          rounded-[inherit]
        "
        style={{
          backgroundColor: 'rgba(255,255,255,0.04)',
          transition: 'background-color 0.5s linear',
        }}
      />

      {/* Overlay Gradient for Hover Effect */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.036)]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
          rounded-[inherit]
        "
      />

      {/* Card Content */}
      <div className="z-10 flex flex-col items-center space-y-2">
        {/* Image without size transition */}
        <div
          style={{
            width: imageSize.width,
            height: imageSize.height,
          }}
        >
          <Image
            src={imgUrl}
            alt={title}
            width={imageSize.width}
            height={imageSize.height}
            objectFit="contain"
            priority={false}
            loading="lazy"
          />
        </div>
        {/* Title */}
        <h3
          className="text-center text-[12px] md:text-md lg:text-lg font-regular text-white group-hover:text-white"
          style={{ transition: 'color 0.5s linear' }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
