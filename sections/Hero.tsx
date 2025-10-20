import HeroClient from './HeroClient';
import MotionWrapper from '../components/MotionWrapper';
import WordFlipWrapper from '../components/WordFlipWrapper';
import styles from '../styles';
import { staggerContainer, textVariant } from '../utils/motion';

export default function Hero(): JSX.Element {
  return (
    <section
      className={`${styles.yPaddings} py-14 lg:py-22 md:py-20 sm:py-16 relative`}
      id="home"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/texture-new.jpg)' }}
      />

      <MotionWrapper
        variants={staggerContainer(0.1, 0.2)}
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
            <span className="whitespace-nowrap">
              reparații <WordFlipWrapper />
            </span>
          </MotionWrapper>
        </div>
      </MotionWrapper>

      <HeroClient />
    </section>
  );
}
