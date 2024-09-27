'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ServiceCard = ({ service, onClick, selectedService, onClose, isAnimationComplete }) => {
  const { imgUrl, title, sizes } = service;
  const isSelected = selectedService && selectedService.title === title;

  // State to manage screen size
  const [screenSize, setScreenSize] = useState('md');

  useEffect(() => {
    // Function to handle screen resize
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
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
  const imageSize = isSelected
    ? sizes.expanded
    : sizes[screenSize] || sizes.md;

  return (
    <>
      {/* Service Card */}
      <motion.div
        className="
          relative cursor-pointer group
          w-[200px] h-[200px]
          sm:w-[200px] sm:h-[200px]
          md:w-[203px] md:h-[203px]
          lg:w-[235px] lg:h-[235px]
          xl:w-[270px] xl:h-[270px]
          2xl:w-[320px] 2xl:h-[320px]
          rounded-[20px]
          sm:rounded-[22px]
          md:rounded-[26px]
          lg:rounded-[30px]
          xl:rounded-[36px]
          2xl:rounded-[44px]
          overflow-hidden
          flex flex-col justify-center items-center
          p-4
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
              ? 'rgba(30,30,30,0.75)' // Updated to match glassmorphism
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
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="relative"
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
            className="mt-2 text-center text-sm md:text-lg lg:text-xl font-regular text-white group-hover:text-white"
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
            className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop with Blur */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
              onClick={onClose}
            />

            {/* Animated Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
              {/* Existing Animated Gradients */}
              <motion.div
                className="gradient-01"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: 'linear',
                }}
              ></motion.div>
              <motion.div
                className="gradient-02"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 15,
                  ease: 'easeInOut',
                }}
              ></motion.div>
              <motion.div
                className="gradient-03"
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 25,
                  ease: 'linear',
                }}
              ></motion.div>
              <motion.div
                className="gradient-04"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 18,
                  ease: 'easeInOut',
                }}
              ></motion.div>
              <motion.div
                className="footer-gradient"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: 'easeInOut',
                }}
              ></motion.div>

              {/* Additional Larger Glow Layers */}
              {/* Outer Glow Layer 1 */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(circle, rgba(165,9,255,0.4) 0%, rgba(52,172,199,0.2) 60%, rgba(161,52,199,0) 100%)',
                  borderRadius: 'inherit',
                  filter: 'blur(100px)',
                  opacity: 0.3,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 30,
                  ease: 'linear',
                }}
              ></motion.div>

              {/* Outer Glow Layer 2 */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '140%',
                  height: '140%',
                  background: 'radial-gradient(circle, rgba(165,9,255,0.3) 0%, rgba(52,172,199,0.1) 70%, rgba(161,52,199,0) 100%)',
                  borderRadius: 'inherit',
                  filter: 'blur(150px)',
                  opacity: 0.2,
                }}
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 40,
                  ease: 'linear',
                }}
              ></motion.div>
            </div>

            {/* Modal Content */}
            <motion.div
              className="
                relative mt-10 mb-10
                rounded-[44px] overflow-y-auto hide-scrollbar max-h-[90vh] /* Enable vertical scrolling if content overflows */
                flex flex-col items-center
                w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]
                p-6 md:p-8 lg:p-12
                glassmorphism /* Updated background color and opacity */
                z-50
              "
              layoutId={`card-${title}`}
              transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                style={{ zIndex: 1000 }} // Ensures it's on top
                onClick={onClose}
                aria-label="Close Modal"
              >
                &times;
              </button>

              {/* Content Wrapper */}
              <div className="relative z-50 flex flex-col items-center w-full">
                {/* iPhone Image */}
                <motion.div
                  className="relative"
                  layoutId={`card-image-${title}`}
                  transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
                  style={{
                    width: sizes.expanded.width,
                    height: sizes.expanded.height,
                    maxWidth: '100%',
                    maxHeight: '50vh',
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={title}
                    width={sizes.expanded.width}
                    height={sizes.expanded.height}
                    objectFit="contain"
                  />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="mt-8 text-center text-xl md:text-2xl lg:text-3xl font-bold text-white"
                  layoutId={`card-title-${title}`}
                  transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
                >
                  Service {title}
                </motion.h2>

                {/* Services Grid */}
                <div className="mt-8 w-full px-4">
                  <div className="grid grid-cols-[70%_10%_20%] gap-4 mr-6 ">
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
                    {service.services &&
                      service.services.map((serviceItem, index) => (
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
                <div className="mt-12 text-white text-center px-4">
                  <p>Prețurile afișate includ piesa și manopera aferentă schimbării.</p>
                  <p>Contactați-ne pentru mai multe detalii.</p>
                </div>

                {/* CTA Button */}
                <button
                  className="
                    mt-6
                    flex items-center justify-center
                    w-[225px] h-[66px]
                    bg-[#25618B]
                    rounded-[32px]
                    text-white text-lg font-semibold
                    hover:bg-[#1f4d6a] /* Darken on hover */
                    transition-colors duration-300
                  "
                  onClick={() => {
                    // Define the action, e.g., open chat or navigate to contact page
                    // For example, navigate to contact page:
                    // router.push('/contact');
                  }}
                  aria-label="Trimite un mesaj"
                >
                  {/* Chat Icon */}
                  <Image
                    src="/chat.svg"
                    alt="Chat Icon"
                    width={24} // Adjust size as needed
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
