// components/ServiceCard.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ServiceCard = ({
  service,
  onClick,
  selectedService,
  onClose,
  isAnimationComplete,
}) => {
  const { imgUrl, title, sizes, services } = service;
  const isSelected = selectedService && selectedService.title === title;

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

  // Toggle body overflow when modal is open/closed
  useEffect(() => {
    if (isSelected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSelected]);

  // Get image size based on screen size
  const imageSize = isSelected ? sizes.expanded : sizes[screenSize] || sizes.sm;

  // Adjusted image size when expanded
  const expandedImageSize = {
    width: imageSize.width * 0.7,
    height: imageSize.height * 0.7,
  };

  return (
    <>
      {/* Service Card */}
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
        layoutId={`card-${title}`}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') onClick();
        }}
        aria-label={`Open details for ${title}`}
      >
        {/* Base Gradient */}
        <motion.div
          className="
            absolute inset-0
            pointer-events-none
            rounded-[inherit]
          "
          layoutId={`card-bg-${title}`}
          style={{
            backgroundColor: isSelected
              ? 'rgba(30,30,30,0.75)'
              : 'rgba(255,255,255,0.04)',
          }}
          transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
        ></motion.div>

        {/* Overlay Gradient for Hover Effect */}
        {!isSelected && (
          <div
            className="
              absolute inset-0
              bg-gradient-to-b from-[rgba(255,255,255,0.12)] to-[rgba(255,255,255,0.036)]
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              pointer-events-none
              rounded-[inherit]
            "
          ></div>
        )}

        {/* Card Content */}
        <div className="z-10 flex flex-col items-center space-y-2">
          <motion.div
            layoutId={`card-image-${title}`}
            transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
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
          </motion.div>
          <motion.h3
            className="text-center text-[12px] md:text-md lg:text-lg font-regular text-white group-hover:text-white"
            layoutId={`card-title-${title}`}
            transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
          >
            {title}
          </motion.h3>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key={title}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with Blur */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
              className="
                relative
                rounded-[44px]
                flex flex-col items-center
                w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]
                p-6
                outer-shadow
                glassmorphism-modal
                z-50
                max-h-[90vh] overflow-y-auto hide-scrollbar
              "
              layoutId={`card-${title}`}
              transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                style={{ zIndex: 1000 }}
                onClick={onClose}
                aria-label="Close Modal"
              >
                &times;
              </button>

              {/* Content Wrapper */}
              <div className="flex flex-col items-center w-full space-y-6">
                {/* Image */}
                <motion.div
                  layoutId={`card-image-${title}`}
                  transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
                  style={{
                    width: expandedImageSize.width,
                    height: expandedImageSize.height,
                    maxWidth: '100%',
                    maxHeight: '35vh',
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={title}
                    width={expandedImageSize.width}
                    height={expandedImageSize.height}
                    objectFit="contain"
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-white"
                  layoutId={`card-title-${title}`}
                  transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
                >
                  Service {title}
                </motion.h2>

                {/* Services Grid */}
                <div className="w-full px-4">
                  <div className="grid grid-cols-[65%_15%_20%] gap-4 mr-6">
                    {/* Header Row */}
                    <div className="font-semibold text-white text-left">
                      Serviciu
                    </div>
                    <div className="font-semibold text-white text-right">
                      Durată
                    </div>
                    <div className="font-semibold text-white text-right">
                      Preț
                    </div>

                    {/* Services List */}
                    {services &&
                      services.map((serviceItem, index) => (
                        <React.Fragment key={index}>
                          <div className="text-white text-left">
                            {serviceItem.name}
                          </div>
                          {/* Enhanced Hover Effects */}
                          <div className="text-right text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate transition-all duration-300 ease-in-out">
                            {serviceItem.duration}
                          </div>
                          <div className="text-right text-white hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate transition-all duration-300 ease-in-out">
                            {serviceItem.price}
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                </div>

                {/* CTA Sentences */}
                <div className="text-white text-center px-4 space-y-2">
                  <p>
                    Prețurile afișate includ piesa și manopera aferentă schimbării.
                  </p>
                  <p>Contactați-ne pentru mai multe detalii.</p>
                </div>

                {/* CTA Button */}
                <button
                  className="
                    flex items-center justify-center
                    w-[225px] h-[66px]
                    bg-[#25618B]
                    rounded-[32px]
                    text-white text-lg font-semibold
                    hover:bg-[#1f4d6a]
                    transition-colors duration-300
                  "
                  onClick={() => {
                    // Define the action, e.g., open chat or navigate to contact page
                  }}
                  aria-label="Trimite un mesaj"
                >
                  {/* Chat Icon */}
                  <Image
                    src="/chat.svg"
                    alt="Chat Icon"
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  Trimite un mesaj
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceCard;
