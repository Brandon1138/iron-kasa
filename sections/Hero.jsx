// sections/Hero.jsx

import HeroClient from './HeroClient';
import styles from '../styles';

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

    {/* Client Component for Dynamic Content */}
    <HeroClient />
  </section>
);

export default Hero;
