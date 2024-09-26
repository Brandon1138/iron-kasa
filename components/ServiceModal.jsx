// components/ServiceModal.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const ServiceModal = ({ isVisible, onClose, imgUrl, title, services, cardId, modelWidth, modelHeight }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="
              relative bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
              rounded-[44px] overflow-hidden
              flex flex-col items-center
              p-6 md:p-8 lg:p-12
              w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]
              max-h-[90vh] overflow-y-auto
            "
            layoutId={`card-${cardId}`}
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={onClose}
            >
              &times;
            </button>

            {/* iPhone Image */}
            <div className="relative w-2/3 md:w-1/2">
              <Image
                src={imgUrl}
                alt={title}
                layout="responsive"
                width={modelWidth}
                height={modelHeight}
                objectFit="contain"
              />
            </div>

            {/* Title */}
            <h2 className="mt-4 text-center text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Service {title}
            </h2>

            {/* Services Grid */}
            <div className="mt-6 w-full px-4">
              <div className="grid grid-cols-3 gap-4">
                {/* Header Row */}
                <div className="font-semibold text-white">Serviciu</div>
                <div className="font-semibold text-white text-center">Durată</div>
                <div className="font-semibold text-white text-center">Preț</div>

                {/* Services List */}
                {services && services.map((service, index) => (
                  <React.Fragment key={index}>
                    <div className="text-white">{service.name}</div>
                    <div className="text-white text-center">{service.duration}</div>
                    <div className="text-white text-center">{service.price}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Placeholder Sentences */}
            <div className="mt-6 text-white text-center">
              <p>Aici va fi un mesaj personalizat despre serviciu.</p>
              <p>Un alt mesaj sau instrucțiuni suplimentare.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
