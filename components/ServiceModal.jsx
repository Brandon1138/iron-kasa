// components/ServiceModal.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: { 
    y: '50%',
    opacity: 1,
    transition: { delay: 0.2 }
  },
};

const ServiceModal = ({ isVisible, onClose, imgUrl, title, description }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 relative"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <div className="relative w-2/3 h-2/3 mb-4">
            <Image
              src={imgUrl}
              alt={title}
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;
