// sections/Hero.jsx

import HeroClient from './HeroClient';
import MotionWrapper from '../components/MotionWrapper';
import WordFlipWrapper from '../components/WordFlipWrapper'; // Import the wrapper
import styles from '../styles';
import { staggerContainer, textVariant } from '../utils/motion';

const Hero = () => (
  <section
    className={`${styles.yPaddings} py-14 lg:py-22 md:py-20 sm:py-16 relative`}
    id="home"
  >
    {/* Texture Background with 4px Blur */}
    <div
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: 'url(/texture-new.jpg)' }}
    />

    {/* Headings Wrapped in MotionWrapper */}
    <MotionWrapper
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="w-full flex flex-col relative z-40 pt-12 sm:pt-16 md:pt-24 lg:pt-32"
    >
      <div className="flex justify-center pt-8 sm:pt-8 items-center flex-col relative z-40 md:gap-y-2 lg:gap-y-3">
        <MotionWrapper
          variants={textVariant(1.1)}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.heroHeading}>Specialiști în</h1>
        </MotionWrapper>
        <MotionWrapper
          variants={textVariant(1.2)}
          initial="hidden"
          animate="show"
          className={`${styles.heroHeading} flex items-center gap-x-3 `}
        >
          {/* Replace WordFlip with WordFlipWrapper */}
          <span className="whitespace-nowrap">
            reparații <WordFlipWrapper />
          </span>
        </MotionWrapper>
      </div>
    </MotionWrapper>

    {/* Dynamic Content: Video and Effects */}
    <HeroClient />
  </section>
);

export default Hero;
