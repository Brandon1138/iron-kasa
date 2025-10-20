'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MotionWrapper from '../components/MotionWrapper';
import { fadeIn } from '../utils/motion';

export default function HeroClient(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const videoElement = (
    <video
      className="w-full h-full object-cover"
      playsInline
      autoPlay
      muted
      loop
      preload="auto"
      poster="/fallback-image.png"
    >
      <source src="/hero_video_480p.mp4" type="video/mp4" media="(max-width: 640px)" />
      <source src="/hero_video_720p.mp4" type="video/mp4" media="(max-width: 1024px)" />
      <source src="/hero_video_1080p.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className="relative z-40">
        <div className="relative w-full lg:pt-16 md:pt-12 sm:pt-8 pt-8">
          <div className="w-full aspect-video">{videoElement}</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative z-40">
      <motion.div
        style={{
          scale,
          borderRadius,
        }}
        className="relative w-full lg:pt-16 md:pt-12 sm:pt-8 pt-8"
      >
        <MotionWrapper
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          animate="show"
          className="w-full aspect-video"
        >
          <motion.video
            style={{
              borderRadius,
            }}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
            poster="/fallback-image.png"
          >
            <source src="/hero_video_480p.mp4" type="video/mp4" media="(max-width: 640px)" />
            <source src="/hero_video_720p.mp4" type="video/mp4" media="(max-width: 1024px)" />
            <source src="/hero_video_1080p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </MotionWrapper>
      </motion.div>
    </div>
  );
}
