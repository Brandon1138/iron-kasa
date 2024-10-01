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
    <section className={`${styles.yPaddings} lg:mt-[130px] md:mt-[90px] sm:mt-[50px] mt-[50px]`}> {/* Shift Hero section down by 200px. Adjust 'mt-[200px]' if needed */}
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col"
      >
        <div className="flex justify-center items-center flex-col relative z-10 md:gap-y-2 lg:gap-y-3">
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
          <div className="w-full aspect-video overflow-hidden">
            <video
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              poster="/fallback-image.png" // Ensure this path is correct
            >
              {/* Mobile Video Source */}
              <source
                src="/hero_video_480p.mp4"
                type="video/mp4"
                media="(max-width: 640px)"
              />
              {/* Tablet Video Source */}
              <source
                src="/hero_video_720p.mp4"
                type="video/mp4"
                media="(max-width: 1024px)"
              />
              {/* Desktop Video Source */}
              <source
                src="/hero_video_1080p.mp4"
                type="video/mp4"
              />
              {/* Fallback Text */}
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
