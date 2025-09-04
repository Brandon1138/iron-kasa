import styles from '../../styles';
import { mainDisclaimer } from '../../constants';
import { CategoryContent } from '../../components/Overview';

export const metadata = {
  title: 'Reparații MacBook | iPhone Doctor',
  description: 'Servicii de reparații pentru MacBook: diagnoză, plăci de bază, upgrade SSD/RAM, tastaturi și altele.'
};

export default function MacbooksPage() {
  return (
    <section className={`${styles.paddings} px-6 py-12 relative`}>
      <div className="absolute inset-0 z-0 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#121212_2px)] bg-[size:20px_20px]" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col items-center relative z-10`}>
        <div className="text-center mt-4">
          <h1 className="font-bold text-3xl text-white">Reparații MacBook</h1>
          <p className="mt-6 text-white text-opacity-50 text-[20px]">{mainDisclaimer[2]}</p>
        </div>

        <CategoryContent selectedCategory={2} isAnimationComplete />
      </div>
    </section>
  );
}
