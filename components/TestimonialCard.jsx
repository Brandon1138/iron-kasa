import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const TestimonialCard = ({ testimonial }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <motion.div
      className="relative bg-[#1E1E1E] bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-[36px] p-6 text-white shadow-lg transition-shadow duration-300 overflow-visible glassmorphism-hover"
      whileHover={isTouchDevice ? {} : { scale: 1.02 }}
    >
      {/* Profile Section */}
      <div className="flex items-center mb-5">
        <Image
          src={testimonial.imgUrl}
          alt={testimonial.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{testimonial.name}</h3>
          <div className="flex items-center">
            <a
              href={testimonial.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm opacity-70 hover:underline"
            >
              {testimonial.username}
            </a>
            {/* Checkmark Icon */}
            <Image
              src="/checkmark.svg"
              alt="Verified"
              width={13}
              height={13}
              className="h-[12px] w-[12px] ml-2 mt-0.5"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <p className="text-sm">{testimonial.text}</p>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-[36px] bg-gradient-to-t from-transparent via-transparent to-white opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default TestimonialCard;
