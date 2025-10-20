// components/ServiceCard.tsx

'use client';

import React, { useState, useEffect, useContext, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AnimationContext } from '../context/AnimationContext';
import '../styles/globals.css'; // Ensure global styles are imported if needed

// Define the structure of a single service
interface Service {
  imgUrl: string;
  title: string;
  sizes: Sizes;
}

// Define the structure for sizes
interface Sizes {
  sm: { width: number; height: number };
  md?: { width: number; height: number };
  lg?: { width: number; height: number };
  xl?: { width: number; height: number };
  // Add other sizes if necessary
}

// Define the props for the ServiceCard component
interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  isAnimationComplete: boolean;
  isActive: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onClick,
  isAnimationComplete,
  isActive,
}) => {
  const { imgUrl, title, sizes } = service;
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error(
      'AnimationContext must be used within an AnimationProvider'
    );
  }
  const { canAnimate } = context;
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('sm');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Handle screen resize to set screenSize state
  useEffect(() => {
    const handleResize = (): void => {
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
      handleResize(); // Initialize screen size
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Determine the image size based on screenSize
  const imageSize = sizes[screenSize] || sizes.lg || sizes.md || sizes.sm;

  // Determine if glow effect should be visible
  const isGlowVisible: boolean = isActive || isHovered;

  // Handle key press events for accessibility
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <motion.div
      className="
        relative cursor-pointer group
        w-[150px] aspect-square
        sm:w-[200px]
        md:w-[203px]
        lg:w-[270px]
        xl:w-[320px]
        rounded-[30px]
        sm:rounded-[32px]
        md:rounded-[36px]
        lg:rounded-[44px]
        xl:rounded-[50px]
        overflow-visible
        flex justify-center items-center
        outer-shadow
        glassmorphism
        transition-transform duration-300
        group-hover:scale-105
      "
      onClick={() => {
        if (isAnimationComplete) onClick();
      }}
      whileHover={{ scale: 1.05 }}
      animate={{ scale: isActive ? 1.05 : 1 }}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open details for ${title}`}
    >
      <AnimatePresence>
        {isGlowVisible && canAnimate && (
          <motion.div
            key="glow"
            className={`
              absolute inset-0 transform
              blur-md sm:blur-md md:blur-lg lg:blur-xl xl:blur-2xl
              animate-spin-slow
              pointer-events-none
              z-0
              rounded-[30px]
              sm:rounded-[32px]
              md:rounded-[36px]
              lg:rounded-[44px]
              xl:rounded-[50px]
              scale-100 sm:scale-110 md:scale-125 lg:scale-150 xl:scale-175 2xl:scale-200
            `}
            style={{
              background:
                'conic-gradient(from 0deg, #a855f7 0%, #c34cdc 25%, #f43f5e 50%, #ec6e36 75%, #d97706 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {isGlowVisible && !canAnimate && (
          <motion.div
            key="box-shadow"
            className={`
              absolute inset-0
              z-0
              rounded-[30px]
              sm:rounded-[32px]
              md:rounded-[36px]
              lg:rounded-[44px]
              xl:rounded-[50px]
              box-shadow-fallback
            `}
            style={{
              boxShadow:
                '-8px -8px 32px rgba(168, 85, 247, 0.37), ' +
                '0px 0px 32px rgba(244, 63, 94, 0.37), ' +
                '8px 8px 32px rgba(217, 119, 6, 0.37)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      <div
        className={`
          absolute inset-0 z-10
          flex flex-col justify-center items-center
          rounded-[30px]
          sm:rounded-[32px]
          md:rounded-[36px]
          lg:rounded-[44px]
          xl:rounded-[50px]
          transition-colors duration-500
          bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
          ${
            isGlowVisible
              ? 'from-[#1e1e1eBF] to-[#1e1e1eBF]'
              : 'from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]'
          }
        `}
      >
        <div
          style={{
            width: imageSize.width,
            height: imageSize.height,
            position: 'relative',
          }}
          className="flex justify-center items-center"
        >
          <Image
            src={imgUrl}
            alt={title}
            fill
            style={{ objectFit: 'contain' }}
            sizes={`
              (min-width: 1280px) 320px,
              (min-width: 1024px) 270px,
              (min-width: 768px) 203px,
              (min-width: 640px) 200px,
              150px
            `}
            priority={false}
            loading="lazy"
          />
        </div>
        <h3
          className="mt-2 text-center text-[12px] md:text-md lg:text-lg font-regular text-white group-hover:text-white"
          style={{ transition: 'color 0.5s linear' }}
        >
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
