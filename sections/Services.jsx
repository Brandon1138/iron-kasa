// Services.jsx

'use client';

import { TypingText, TitleText } from '../components';
import { motion } from 'framer-motion';
import styles from '../styles';
import { staggerContainer, fadeIn } from '../utils/motion';
import { categoryCard, mainDisclaimer } from '../constants';
import CategoryCard from '../components/CategoryCard';
import { useState } from 'react';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryTitles = [
    'Reparații iPhone',
    'Reparații iPad',
    'Reparații MacBook',
    'Reparații iMac',
  ];

  const handleCategorySelect = (index) => {
    setSelectedCategory(index);
  };

  return (
    <section className={`${styles.paddings} px-6 py-12`} id="services">
      <div className={`${styles.innerWidth} mx-auto flex flex-col items-center`}>
        {/* TypingText */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="flex flex-col items-center"
        >
          <TypingText title="| Servicii" textStyles="text-center" />
        </motion.div>

        {/* TitleText */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mt-4"
        >
          <TitleText title="Alege dispozitivul pe care vrei să îl repari" />
        </motion.div>

        {/* Category Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="
            grid grid-cols-4 mt-8 py-8
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
      </div>
    </section>
  );
};

export default Services;
