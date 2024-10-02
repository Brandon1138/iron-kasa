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

  // Get image size based on screen size only (decoupled from isSelected)
  const imageSize = sizes[screenSize] || sizes.sm;

  // Adjusted image size for the modal (remains independent)
  const expandedImageSize = {
    width: sizes.expanded.width * 0.7,
    height: sizes.expanded.height * 0.7,
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  // Animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.6 },
    exit: { opacity: 0 },
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
            backgroundColor: isSelected
              ? 'rgba(30,30,30,0.75)'
              : 'rgba(255,255,255,0.04)',
            transition: 'background-color 0.5s linear',
          }}
        />

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
          />
        )}

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

      {/* AnimatePresence to handle exit animations */}
      <AnimatePresence>
        {/* Modal */}
        {isSelected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
          >
            {/* Backdrop with Blur */}
            <motion.div
              className="absolute inset-0 bg-black backdrop-blur-sm"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
              style={{ cursor: 'pointer' }}
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
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow:
                  '12px 12px 48px rgba(97, 31, 135, 0.2), -12px -12px 48px rgba(135, 31, 95, 0.2)',
              }}
            >
              {/* Close Button */}
              <button
                type="button" // Added type attribute
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
                <div
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
                </div>

                {/* Title */}
                <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-white">
                  Service {title}
                </h2>

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
                    {
                      services
                      && services.map((serviceItem, index) => (
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
                      ))
                    }
                  </div>
                </div>

                {/* CTA Sentences */}
                <div className="text-white text-center px-4 space-y-2">
                  <p>
                    Prețurile afișate includ piesa și manopera aferentă
                    schimbării.
                  </p>
                  <p>Contactați-ne pentru mai multe detalii.</p>
                </div>

                {/* CTA Button */}
                <button
                  type="button" // Added type attribute
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
