// sections/AboutClient.jsx

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TypingText } from '../components';
import Features from '../components/Features';

import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { features } from '../constants';
import { detectFrameRate } from '../utils/frameRateDetection';

const AboutClient = () => {
  const [canAnimate, setCanAnimate] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('canAnimate');
    if (stored !== null) {
      setCanAnimate(stored === 'true');
      setHasChecked(true);
    } else {
      detectFrameRate().then((result) => {
        setCanAnimate(result);
        setHasChecked(true);
      });
    }
  }, []);

  if (!hasChecked) {
    // Placeholder to mitigate CLS
    return (
      <div className="w-full flex flex-col px-6 lg:max-w-[85vw] mx-auto pb-2">
        <div className="h-6 bg-stone-700 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-stone-700 rounded w-2/3 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="h-32 bg-stone-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {canAnimate ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="w-full flex flex-col px-6 lg:max-w-[85vw] mx-auto pb-2"
        >
          {/* Section Title */}
          <TypingText title="| Despre noi" textStyles="text-left" />

          {/* Section Header */}
          <motion.h2
            variants={fadeIn('up', 'tween', 0.2, 1)}
            className="mt-[8px] font-bold lg:text-[64px] md:text-[48px] sm:text-[32px] text-[32px] text-left text-white"
          >
            Rezolvăm{' '}
            <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              orice
            </span>{' '}
            problemă
          </motion.h2>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeIn('up', 'tween', 0.2 * index, 0.8)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <Features
                  imgUrl={feature.imgUrl}
                  title={feature.title}
                  subtitle={feature.subtitle}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        // Static Version without Animations
        <div className="w-full flex flex-col px-6 lg:max-w-[85vw] mx-auto pb-2">
          {/* Section Title */}
          <TypingText title="| Despre noi" textStyles="text-left" />

          {/* Section Header */}
          <h2 className="mt-[8px] font-bold lg:text-[64px] md:text-[48px] sm:text-[32px] text-[32px] text-left text-white">
            Rezolvăm{' '}
            <span className="bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              orice
            </span>{' '}
            problemă
          </h2>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {features.map((feature) => (
              <div key={feature.title}>
                <Features
                  imgUrl={feature.imgUrl}
                  title={feature.title}
                  subtitle={feature.subtitle}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AboutClient;
