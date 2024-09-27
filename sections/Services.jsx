// Services.jsx
'use client';

import { TypingText, TitleText } from '../components';
import { motion } from 'framer-motion';
import styles from '../styles';
import { staggerContainer, fadeIn } from '../utils/motion';
import { categoryCard, mainDisclaimer, iPhoneServiceDetails } from '../constants';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import { useState } from 'react';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false); // New state

  const categoryTitles = [
    'Reparații iPhone',
    'Reparații iPad',
    'Reparații MacBook',
    'Reparații iMac',
  ];

  const handleCategorySelect = (index) => {
    setSelectedCategory(index);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleModalClose = () => {
    setSelectedService(null);
  };

  return (
    <section className={`${styles.paddings} px-6 py-12`} id="services">
      <div className={`${styles.innerWidth} mx-auto flex flex-col items-center`}>
        {/* TypingText */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }} // Changed 'once' to true
          onAnimationComplete={() => setIsAnimationComplete(true)} // Callback
          className="flex flex-col items-center"
        >
          <TypingText title="| Servicii" textStyles="text-center" />
        </motion.div>

        {/* TitleText */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }} // Changed 'once' to true
          className="text-center mt-4"
        >
          <TitleText title="Alege dispozitivul pe care vrei să îl repari" />
        </motion.div>

        {/* Category Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }} // Changed 'once' to true
          className="
            grid grid-cols-4 sm:grid-cols-4 mt-8 py-8 px-4
            gap-[10px] sm:gap-[14px] lg:gap-[30px]
            w-full
          "
        >
          {categoryCard.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'tween', index * 0.1, 1)}
              className="flex justify-center"
            >
              <CategoryCard
                imgUrl={category.imgUrl}
                title={categoryTitles[index]}
                onSelect={() => handleCategorySelect(index)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Category Information */}
        {selectedCategory !== null && (
          <motion.div
            key={selectedCategory}
            variants={fadeIn('up', 'tween', 0.2, 1)}
            initial="hidden"
            animate="show"
            className="mt-12 text-center px-4"
          >
            <h3 className="font-bold text-3xl text-white">
              {categoryTitles[selectedCategory]}
            </h3>
            <motion.p
              variants={fadeIn('up', 'tween', 0.3, 1)}
              initial="hidden"
              animate="show"
              className="mt-12 text-white text-opacity-50 text-[20px]"
            >
              {mainDisclaimer[0]}
            </motion.p>
          </motion.div>
        )}

        {/* Service Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }} // Changed 'once' to true
          onAnimationComplete={() => setIsAnimationComplete(true)} // Callback
          className="
            grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            mt-8 py-8 px-4
            gap-[12px] sm:gap-[12px] md:gap-[16px] lg:gap-[22px] xl:gap-[26px] 2xl:gap-[30px]
            w-full
          "
        >
          {iPhoneServiceDetails.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 'tween', index * 0.1, 1)}
              className="flex justify-center"
            >
              <ServiceCard
                service={service}
                onClick={() => handleServiceSelect(service)}
                selectedService={selectedService}
                onClose={handleModalClose}
                isAnimationComplete={isAnimationComplete} // Pass down the state
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
