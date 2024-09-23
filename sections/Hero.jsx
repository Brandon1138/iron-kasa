// Hero.jsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from '../styles';
import { fadeIn, staggerContainer, textVariant } from '../utils/motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 44]);

  return (
    <section className={`${styles.yPaddings}`}>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.h1 variants={textVariant(1.1)} className={styles.heroHeading}>
            Specialiști în
          </motion.h1>
          <motion.h1 variants={textVariant(1.2)} className={styles.heroHeading}>
            reparații Apple
          </motion.h1>
        </div>
        <motion.div
          style={{ scale, borderRadius }}
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="relative w-full pt-16 md:-mt-[10px] -mt-[12px] overflow-hidden"
        >
          <div className="w-full aspect-video overflow-hidden ">
            <video
              src="/hero_video.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
