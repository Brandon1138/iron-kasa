// components/ServiceModal.jsx

'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  const { imgUrl, title, sizes, services } = service;
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
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
        className="fixed inset-0 bg-black backdrop-blur-sm"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        style={{ cursor: 'pointer' }}
        aria-label="Close Modal"
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
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
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
              {services
                && services.map((serviceItem, index) => (
                  <React.Fragment key={index}>
                    <div className="text-white text-left">
                      {serviceItem.name}
                    </div>
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
              Prețurile afișate includ piesa și manopera aferentă
              schimbării.
            </p>
            <p>Contactați-ne pentru mai multe detalii.</p>
          </div>

          {/* CTA Button */}
          <button
            type="button"
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
  );
};

export default ServiceModal;
