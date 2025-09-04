// components/Services.jsx

"use client";

import { TypingText, TitleText } from '../components/Effects';
import { motion } from 'framer-motion';
import styles from '../styles';
import { staggerContainer, fadeIn } from '../utils/motion';
import { categoryCard } from '../constants';
import CategoryCard from '../components/Cards/CategoryCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const router = useRouter();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);

  const categoryTitles = [
    'Reparații iPhone',
    'Reparații iPad',
    'Reparații MacBook',
    'Reparații iMac',
  ];

  const handleCategorySelect = (index) => {
    // Navigate to category pages instead of expanding inline content
    switch (index) {
      case 0:
        router.push('/iphones');
        break;
      case 1:
        router.push('/ipads');
        break;
      case 2:
        router.push('/macbooks');
        break;
      case 3:
        router.push('/imacs');
        break;
      default:
        break;
    }
    setSelectedCategory(index);
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
          viewport={{ once: false, amount: 0.25 }} // Allow re-animation for TypingText
          onAnimationComplete={() => setIsAnimationComplete(true)}
          className="flex flex-col items-center"
        >
          <TypingText
            key={selectedCategory}
            title="| Servicii"
            textStyles="text-center"
          />
        </motion.div>

        {/* TitleText with Styled "dispozitivul" */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }} // Keep once: true
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
          viewport={{ once: true, amount: 0.25 }} // Keep once: true
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

        {/* Category content is now on dedicated pages via routing */}
      </div>
    </section>
  );
};

export default Services;
