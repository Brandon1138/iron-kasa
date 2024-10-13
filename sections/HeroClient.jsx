'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import MotionWrapper from '../components/MotionWrapper';
import { fadeIn } from '../utils/motion';

const HeroClient = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Animate scale and borderRadius based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div ref={ref} className="relative z-40">
      {!prefersReducedMotion ? (
        <MotionWrapper
          style={{
            scale,
            borderRadius: borderRadius,
          }}
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          animate="show"
          className="relative w-full lg:pt-16 md:pt-12 sm:pt-8 pt-8"
        >
          <div className="w-full aspect-video">
            <motion.video
              style={{
                borderRadius: borderRadius,
              }}
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              poster="/fallback-image.png"
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
              <source src="/hero_video_1080p.mp4" type="video/mp4" />
              {/* Fallback Text */}
              Your browser does not support the video tag.
            </motion.video>
          </div>
        </MotionWrapper>
      ) : (
        // Render static content without animations
        <div className="relative w-full lg:pt-16 md:pt-12 sm:pt-8 pt-8">
          <div className="w-full aspect-video">
            <video
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
              poster="/fallback-image.png"
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
              <source src="/hero_video_1080p.mp4" type="video/mp4" />
              {/* Fallback Text */}
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroClient;
