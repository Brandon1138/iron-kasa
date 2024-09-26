'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ServiceCard = ({ service, onClick, selectedService, onClose }) => {
  const { imgUrl, title } = service;
  const isSelected = selectedService && selectedService.title === title;

  return (
    <>
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
        onClick={onClick}
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
        <div
          className="
            absolute inset-0
            bg-gradient-to-b from-[rgba(255,255,255,0.04)] to-[rgba(255,255,255,0.012)]
            pointer-events-none
            rounded-[inherit]
          "
        ></div>

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
        ></div>

        {/* Card Content */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-4/5 h-auto">
            <Image
              src={imgUrl}
              alt={title}
              layout="responsive"
              width={500} // Provide default width
              height={1000} // Provide default height to maintain aspect ratio
              objectFit="contain"
              priority={false}
              loading="lazy"
            />
          </div>
          <h3 className="mt-2 text-center text-sm md:text-lg lg:text-xl font-regular text-white group-hover:text-white">
            {title}
          </h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-90"
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
              layoutId={`card-${title}`}
              transition={{ duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={onClose}
              >
                &times;
              </button>

              {/* iPhone Image */}
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <Image
                  src={imgUrl}
                  alt={title}
                  layout="fill"
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
                  {service.services &&
                    service.services.map((serviceItem, index) => (
                      <React.Fragment key={index}>
                        <div className="text-white">{serviceItem.name}</div>
                        <div className="text-white text-center">{serviceItem.duration}</div>
                        <div className="text-white text-center">{serviceItem.price}</div>
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
    </>
  );
};

export default ServiceCard;
