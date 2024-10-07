// ServiceModal.jsx

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Portal from './Portal';
import '../styles/globals.css';

const ServiceModal = ({ service, onClose }) => {
  const [showModal, setShowModal] = useState(!!service);

  useEffect(() => {
    if (service) {
      setShowModal(true);
    }
  }, [service]);

  const handleClose = () => {
    setShowModal(false);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

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

  return (
    <Portal>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (!showModal) {
            onClose();
          }
        }}
      >
        {showModal && (
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
              onClick={handleClose}
              style={{ cursor: 'pointer' }}
              aria-label="Close Modal"
            />

            {/* Modal Content */}
            <motion.div
              className="
                relative
                rounded-[44px]
                border border-stone-600 border-opacity-50
                flex flex-col items-center
                w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]
                p-6
                shadow-[0_10px_20px_rgba(12,_12,_12,_0.7)]
                bg-stone-700 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 backdrop-saturate-150 backdrop-contrast-100
                z-50
                max-h-[90vh] overflow-y-auto hide-scrollbar
              "
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Noise Overlay */}
              <div className="absolute inset-0">
                <Image
                  src="/noise.png"
                  alt="Background Noise"
                  fill
                  className="opacity-5 pointer-events-none"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Close Button */}
              <button
                type="button"
                className="
                  absolute top-4 right-4
                  text-white text-3xl font-bold z-10
                  transition-colors duration-300 ease-in-out
                  hover:text-red-500
                "
                onClick={handleClose}
                aria-label="Close Modal"
              >
                &times;
              </button>

              {/* Content Wrapper */}
              <div className="flex flex-col py-4 items-center w-full space-y-6 relative z-10">
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
                <div className="w-full px-6">
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

                {/* CTA Button */}
                <motion.button
                  type="button"
                  className="
                      flex items-center justify-center
                      w-[225px] h-[66px]
                      bg-[#d97706]
                      rounded-[32px]
                      text-white text-lg font-semibold
                      hover:bg-[#a95c04]
                      glassmorphism-hover
                      transition-colors duration-300
                    "
                  whileHover={{ scale: 1.02 }} // Optional: Maintain hover effect
                  whileTap={{ scale: 0.98 }} // Optional: Add tap effect for better UX
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
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default ServiceModal;
