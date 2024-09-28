'use client';

import { motion } from 'framer-motion';
import { TypingText } from '../components';
import styles from '../styles';
import { fadeIn, staggerContainer } from '../utils/motion';
import { testimonials } from '../constants';
import TestimonialCard from '../components/TestimonialCard';

const Testimonials = () => {
  // Divide testimonials into three columns
  const column1 = [];
  const column2 = [];
  const column3 = [];

  testimonials.forEach((testimonial, index) => {
    if (index % 3 === 0) {
      column1.push(testimonial);
    } else if (index % 3 === 1) {
      column2.push(testimonial);
    } else {
      column3.push(testimonial);
    }
  });

  // Duplicate the columns for seamless scrolling
  const combinedColumn1 = [...column1, ...column1];
  const combinedColumn2 = [...column2, ...column2];
  const combinedColumn3 = [...column3, ...column3];

  return (
    <section
      className={`${styles.paddings} relative z-10 overflow-hidden`}
      id="testimonials"
      style={{ height: '100vh' }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto`}
      >
        <div className="flex flex-col items-center">
          {/* Typing Text */}
          <TypingText title="| Testimoniale" textStyles="text-center" />

          {/* Animated Heading */}
          <motion.h2
            variants={fadeIn('up', 'tween', 0.3, 1)}
            className="mt-4 font-bold text-3xl lg:text-5xl text-white text-center"
          >
            Ce spun clienții noștri
          </motion.h2>

          {/* Testimonials Content */}
          <div
            className={`relative pt-4 mt-16 px-6 h-[calc(100vh-200px)] overflow-hidden fadeMask`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1 */}
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ['0%', '-100%'] }}
                transition={{
                  duration: 120,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {combinedColumn1.map((testimonial, index) => (
                  <TestimonialCard key={`col1-${index}`} testimonial={testimonial} />
                ))}
              </motion.div>

              {/* Column 2 */}
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ['0%', '-100%'] }}
                transition={{
                  duration: 140,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {combinedColumn2.map((testimonial, index) => (
                  <TestimonialCard key={`col2-${index}`} testimonial={testimonial} />
                ))}
              </motion.div>

              {/* Column 3 */}
              <motion.div
                className="flex flex-col gap-6"
                animate={{ y: ['0%', '-100%'] }}
                transition={{
                  duration: 160,
                  ease: 'linear',
                  repeat: Infinity,
                }}
              >
                {combinedColumn3.map((testimonial, index) => (
                  <TestimonialCard key={`col3-${index}`} testimonial={testimonial} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
