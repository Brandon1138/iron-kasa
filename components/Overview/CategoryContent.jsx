// components/Services/CategoryContent.jsx

'use client';

import { motion } from 'framer-motion';
import ServiceCard from '../Cards/serviceCard';
import { serviceDetails } from '../../constants';
import { fadeIn, staggerContainer } from '../../utils/motion';

const CategoryContent = ({
  selectedCategory,
  isAnimationComplete,
  onServiceSelect,
}) => {
  // Render service cards for iPhone & iPad categories.
  if (selectedCategory === 0 || selectedCategory === 1) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 py-8 px-4 gap-[12px] sm:gap-[12px] md:gap-[16px] lg:gap-[22px] xl:gap-[26px] 2xl:gap-[30px] w-full"
      >
        {serviceDetails[selectedCategory].map((service, index) => (
          <motion.div
            key={index}
            variants={fadeIn('up', 'tween', index * 0.1, 1)}
            className="flex justify-center"
          >
            <ServiceCard
              service={service}
              onClick={() => onServiceSelect(service)}
              isAnimationComplete={isAnimationComplete}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }
  // For MacBook / iMac categories, render the text content along with additional sections.
  else if (selectedCategory === 2 || selectedCategory === 3) {
    const categoryTitle =
      selectedCategory === 2 ? 'Reparații MacBook' : 'Reparații iMac';

    return (
      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 1)}
        initial="hidden"
        animate="show"
        className="mt-12 px-4 w-full max-w-5xl mx-auto"
      >
        {/* Header Section */}
        {selectedCategory === 2 ? (
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            initial="hidden"
            animate="show"
            className="relative w-full h-64 mb-8 rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              backgroundImage: 'url(/Macbook_Header.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <motion.h1
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-white text-4xl font-bold z-10"
            >
              {categoryTitle}
            </motion.h1>
          </motion.div>
        ) : (
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            initial="hidden"
            animate="show"
            className="relative w-full h-64 mb-8 bg-neutral-800 rounded-xl flex items-center justify-center"
          >
            <motion.h1
              variants={fadeIn('up', 'tween', 0.3, 1)}
              className="text-white text-4xl font-bold z-10"
            >
              {categoryTitle}
            </motion.h1>
          </motion.div>
        )}

        {/* Consolidated Introductory Text */}
        <motion.p
          variants={fadeIn('up', 'tween', 0.3, 1)}
          initial="hidden"
          animate="show"
          className="text-white text-opacity-75 text-xl mb-8 leading-relaxed"
        >
          De peste 10 ani ne ocupăm cu repararea tuturor dispozitivelor Apple,
          inclusiv MacBook și iMac. Oferim constatare gratuită în 15 minute,
          prețuri cu până la 60% mai mici decât cele ale service-urilor
          oficiale, și reparații la nivel de componentă, toate realizate de
          tehnicieni cu experiență.
        </motion.p>

        {/* Benefits Section */}
        <SectionTitle title="Beneficiile noastre" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <BenefitCard
            title="Constatare Gratuită"
            text="Diagnostic rapid în 15-30 minute. Pentru cazuri complexe, până la 48 de ore, fără costuri inițiale."
          />
          <BenefitCard
            title="Transparență Completă"
            text="Primești toate detaliile înainte de orice lucrare, pentru decizii informate."
          />
          <BenefitCard
            title="Calitate Superioară"
            text="Folosim piese originale sau compatibile, adaptate nevoilor și bugetului tău."
          />
        </div>

        <SectionTitle title="Cât durează reparația?" />
        <BulletParagraph>
          Lucrările obișnuite (schimbare ecran, baterie, upgrade SSD/HDD/RAM) se
          rezolvă pe loc, în câteva zeci de minute. În cazuri mai grave, 24-48
          de ore.
        </BulletParagraph>
        <BulletParagraph>
          <strong>Exemplu real:</strong> Un client a vărsat apă pe tastatura
          unui MacBook Air 13″. Procedura oficială: înlocuirea întregului
          topcase; noi am schimbat doar tastatura în 40 de minute.
        </BulletParagraph>

        {/* Grid of repair types */}
        <SectionTitle title="Ce fel de reparații efectuăm?" />
        <motion.p
          variants={fadeIn('up', 'tween', 0.35, 1)}
          initial="hidden"
          animate="show"
          className="text-white text-opacity-75 text-xl mb-8 leading-relaxed"
        >
          Alege soluția potrivită pentru nevoile tale.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <RepairCard
            title="Reparații placă de bază"
            text="Defecte de la șocuri mecanice, tensiune, contact cu lichide."
          />
          <RepairCard
            title="Chip-uri și tranzistori"
            text="Înlocuire sau reparații la nivel de componentă, plăci grafice."
          />
          <RepairCard
            title="Schimbare display"
            text="Ecrane sparte sau defecte, baterie, difuzoare, carcasă."
          />
          <RepairCard
            title="Tastaturi"
            text="Înlocuire completă, modificare layout, reparație taste."
          />
          <RepairCard
            title="Upgrade SSD/HDD/RAM"
            text="Instalare și mentenanță macOS (inclusiv Windows la cerere)."
          />
          <RepairCard
            title="Baterii / Acumulatori"
            text="Înlocuire, calibrare, testare autonomie."
          />
          <RepairCard
            title="Înlocuire difuzoare / boxe"
            text="Reparație și înlocuire difuzoare, microfoane, reglaj sunet."
          />
          <RepairCard
            title="Porturi / Conectori"
            text="Reparație și înlocuire porturi de încărcare, USB, etc."
          />
          <RepairCard
            title="Deparolare OS / EFI"
            text="Rescriere EFI/Bios, recuperare date."
          />
          <RepairCard
            title="Curățare și decolmatare"
            text="Coolere, placă de bază, placă video, procesor."
          />
        </div>

        <motion.p
          variants={fadeIn('up', 'tween', 0.5, 1)}
          initial="hidden"
          animate="show"
          className="text-white text-opacity-75 text-xl mb-8 leading-relaxed"
        >
          Folosim piese de calitate, iar fiecare reparație beneficiază de
          garanție între 90 și 365 de zile.
        </motion.p>

        {/* Step-by-step timeline */}
        <SectionTitle title="Cum decurge reparația, pas cu pas?" />
        <div className="relative pl-8 mb-8">
          {/* Vertical connector */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white opacity-30"></div>
          <div className="space-y-8">
            <StepItem
              step="1"
              title="Recepția produsului"
              text="Poți aduce Mac-ul la sediu (Str. Știrului, nr. 8A) sau ni-l trimiți prin curier."
            />
            <StepItem
              step="2"
              title="Diagnoză & ofertă"
              text="Analizăm pe loc (15 minute) sau în max. 72h, apoi discutăm cost și durată."
            />
            <StepItem
              step="3"
              title="Reparația propriu-zisă"
              text="După confirmare, ne apucăm de treabă. În 70% din cazuri, rezolvăm pe loc."
            />
            <StepItem
              step="4"
              title="Returnarea device-ului"
              text="Predăm laptopul funcțional, cu garanție, personal sau prin curier."
            />
          </div>
        </div>

        {/* CTA (Reverted to initial placement) */}
        <motion.button
          variants={fadeIn('up', 'tween', 0.3, 1)}
          className="flex items-center h-fit py-4 px-6 bg-[#d97706] rounded-[32px] gap-[12px] hover:bg-[#a95c04] glassmorphism-hover transition-colors duration-300 self-center mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <img
            src="/chat.svg"
            alt="chat"
            className="w-[24px] h-[24px] object-contain"
          />
          <span className="font-normal text-[16px] text-white">
            Trimite un mesaj
          </span>
        </motion.button>
      </motion.div>
    );
  }

  return null;
};

export default CategoryContent;

/** Helper Components **/

const SectionTitle = ({ title }) => (
  <motion.h2
    variants={fadeIn('up', 'tween', 0.3, 1)}
    initial="hidden"
    animate="show"
    className="font-bold text-2xl md:text-3xl text-white mb-4"
  >
    {title}
  </motion.h2>
);

const BulletParagraph = ({ children }) => (
  <motion.p
    variants={fadeIn('up', 'tween', 0.4, 1)}
    initial="hidden"
    animate="show"
    className="text-white text-opacity-75 text-lg mb-4 leading-relaxed"
  >
    {children}
  </motion.p>
);

const BenefitCard = ({ title, text }) => (
  <motion.div
    variants={fadeIn('up', 'tween', 0.4, 1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className="glassmorphism glassmorphism-hover p-6 rounded-xl text-white flex flex-col items-center text-center transition-transform duration-300 relative overflow-hidden"
  >
    <div className="relative z-10">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-base leading-snug">{text}</p>
    </div>
  </motion.div>
);

const RepairCard = ({ title, text }) => {
  // Mapping repair type titles to their respective background images in the public folder.
  const backgrounds = {
    'Reparații placă de bază': '/Motherboard.webp',
    Tastaturi: '/Keyboard.webp',
    'Chip-uri și tranzistori': '/Chip.webp',
    'Schimbare display': '/Display.webp',
    'Porturi / Conectori': '/Ports.webp',
    'Înlocuire difuzoare / boxe': '/Audio.webp',
    'Baterii / Acumulatori': '/Battery.webp',
    'Upgrade SSD/HDD/RAM': '/Storage.webp',
    'Deparolare OS / EFI': '/Unlocking.webp',
    'Curățare și decolmatare': '/Cleaning.webp',
  };

  const backgroundImage = backgrounds[title] || '';

  return (
    <motion.div
      variants={fadeIn('up', 'tween', 0.4, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative bg-neutral-700 p-4 rounded-xl text-white text-opacity-80 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative z-10">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-base leading-snug">{text}</p>
      </div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
    </motion.div>
  );
};

const StepItem = ({ step, title, text }) => (
  <motion.div
    variants={fadeIn('up', 'tween', 0.4, 1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    className="flex items-center"
  >
    <div className="w-8 h-8 flex items-center justify-center bg-[#d97706] text-white font-bold rounded-full mr-4">
      {step}
    </div>
    <div>
      <h4 className="text-white font-semibold text-lg mb-1">{title}</h4>
      <p className="text-white text-opacity-75 text-base">{text}</p>
    </div>
  </motion.div>
);
