// components/Services.jsx

'use client';

import { TypingText, TitleText } from '../components/Effects';
import { motion } from 'framer-motion'; // Removed AnimatePresence
import styles from '../styles';
import { staggerContainer, fadeIn } from '../utils/motion';
import { categoryCard, mainDisclaimer, serviceDetails } from '../constants';
import CategoryCard from '../components/Cards/CategoryCard';
import ServiceCard from '../components/Cards/ServiceCard';
import ServiceModal from '../components/Modal/ServiceModal';
import { useState } from 'react';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

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
    <section className={`${styles.paddings} px-6 py-12 relative`} id="services">
      {/* Background Div */}
      <div className="absolute inset-0 z-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#121212_2px)] bg-[size:20px_20px]"></div>

      <div
        className={`${styles.innerWidth} mx-auto flex flex-col items-center relative z-10`}
      >
        {/* TypingText */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          onAnimationComplete={() => setIsAnimationComplete(true)}
          className="flex flex-col items-center"
        >
          <TypingText title="| Servicii" textStyles="text-center" />
        </motion.div>

        {/* TitleText with Styled "dispozitivul" */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mt-4"
        >
          <TitleText
            title={
              <>
                Alege{' '}
                <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                  dispozitivul
                </span>{' '}
                pe care vrei să îl repari
              </>
            }
          />
        </motion.div>

        {/* Category Cards Container */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="
            grid grid-cols-4 mt-8 py-8 px-4
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
                id={index}
                imgUrl={category.imgUrl}
                title={categoryTitles[index]}
                onSelect={() => handleCategorySelect(index)}
                isSelected={selectedCategory === index}
                hoveredCategoryId={hoveredCategoryId}
                setHoveredCategoryId={setHoveredCategoryId}
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
              {mainDisclaimer[selectedCategory]}
            </motion.p>
          </motion.div>
        )}

        {/* Service Cards */}
        {selectedCategory !== null && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            onAnimationComplete={() => setIsAnimationComplete(true)}
            className="
              grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
              mt-8 py-8 px-4
              gap-[12px] sm:gap-[12px] md:gap-[16px] lg:gap-[22px] xl:gap-[26px] 2xl:gap-[30px]
              w-full 
            "
          >
            {serviceDetails[selectedCategory].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 'tween', index * 0.1, 1)}
                className="flex justify-center"
              >
                <ServiceCard
                  service={service}
                  onClick={() => handleServiceSelect(service)}
                  isAnimationComplete={isAnimationComplete}
                  isActive={selectedService === service} // Pass isActive prop
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Service Modal */}
        {selectedService && (
          <ServiceModal service={selectedService} onClose={handleModalClose} />
        )}
      </div>
    </section>
  );
};

export default Services;
