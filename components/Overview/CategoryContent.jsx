// components/CategoryContent.jsx

'use client';

import { motion } from 'framer-motion';
import ServiceCard from '../Cards/ServiceCard';
import { serviceDetails } from '../../constants';
import { fadeIn, staggerContainer } from '../../utils/motion';

const CategoryContent = ({
  selectedCategory,
  isAnimationComplete,
  onServiceSelect,
}) => {
  // For iPhone and iPad categories, render ServiceCards.
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

  // For MacBook and iMac categories, render the text content.
  else if (selectedCategory === 2 || selectedCategory === 3) {
    // Replace this with your actual copywritten text.
    const textContent = (
      <div>
        <p className="text-[20px] text-white text-opacity-75">
          <strong>De peste 10 ani</strong>, ne ocupăm cu repararea tuturor
          dispozitivelor Apple, inclusiv MacBook și iMac. Mulți clienți ne-au
          recomandat mai departe datorită <strong>rapidității</strong>,{' '}
          <strong>transparenței</strong> și {''}
          <strong>experienței</strong> tehnicienilor noștri. Dacă nu ne cunoști
          încă, iată cum lucrăm și de ce ne aleg atât de mulți posesori de Mac.
        </p>
        <hr className="my-4 border-white opacity-25" />
        <h2 className="font-bold text-3xl text-white py-2">
          Costuri de Reparație
        </h2>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Constatarea este obligatorie și gratuită</strong> – Analizăm
          fiecare dispozitiv în minimum 15 minute și maximum 72 de ore, în
          funcție de complexitatea problemei.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Te anunțăm înainte de orice lucrare</strong> – După
          constatare, stabilim împreună dacă merită să reparăm placa de bază sau
          alte componente ori să înlocuim doar piesa defectă.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>
            Prețuri cu până la 60% mai mici decât cele oferite de service
          </strong>
          -urile oficiale Apple – Profităm de experiența noastră în reparații la
          nivel de componentă, fără să fie nevoie să schimbăm ansambluri
          întregi.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>
            Piese originale (demontate de pe alte produse Apple) sau compatibile
            de cea mai bună calitate
          </strong>{' '}
          – În funcție de preferințele și bugetul tău.
        </p>
        <hr className="my-4 border-white opacity-25" />
        <h2 className="font-bold text-3xl text-white py-2">
          Cât durează reparația?
        </h2>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          În general, lucrările obișnuite (schimbare ecran, tastatură, baterie,
          upgrade SSD/HDD/RAM, instalare sistem de operare) se pot rezolva{' '}
          <strong>pe loc</strong>, în <strong>câteva zeci de minute</strong>. În
          cel mai rău caz, vei aștepta <strong>24-48</strong> de ore, în funcție
          de gravitatea defecțiunii și aglomerația din service.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Exemplu real:</strong> Un client a vărsat apă pe tastatura
          unui MacBook Air 13″, iar anumite taste nu mai funcționau. Procedura
          oficială Apple ar fi să înlocuiască întregul topcase. Noi am schimbat
          doar tastatura, iar reparația a fost gata în 40 de minute.
        </p>
        <hr className="my-4 border-white opacity-25" />
        <h2 className="font-bold text-3xl text-white py-2">
          Sunteți service oficial Apple?
        </h2>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          Nu suntem și <strong>nici nu ne-am dorit</strong> să fim Apple
          Authorized Service Provider. <strong>În schimb</strong>, avem un
          tehnician acreditat Apple, fost angajat într-un Apple Premium Service
          Provider. Datorită flexibilității pe care o avem, putem lucra rapid,{' '}
          <strong>fără proceduri birocratice</strong>, și menținem costurile la
          un nivel rezonabil.
        </p>
        <hr className="my-4 border-white opacity-25" />
        <h2 className="font-bold text-3xl text-white py-2">
          Ce fel de reparații efectuăm?
        </h2>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          Ne specializăm în reparații electronice la nivel de componentă,
          inclusiv:
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Reparații placă de bază</strong> (defecte de la șocuri
          mecanice, tensiune, contact cu lichide)
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Înlocuire/reparații chip-uri</strong> și tranzistori,
          reparații plăci grafice
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Schimbare display</strong>, baterie, difuzoare, carcasă, mufă
          de încărcare
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Tastaturi</strong> (înlocuire completă, modificare layout,
          reparație taste)
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong> Upgrade SSD/HDD/memorie RAM </strong> și{' '}
          <strong> instalare/mentenanță macOS </strong> (inclusiv Windows dacă
          dorești)
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Porturi / conectori</strong> (USB, USB-C, HDMI, jack 3.5mm)
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Deparolare OS / EFI</strong>, rescriere EFI/Bios, recuperare
          date
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Curățare și decolmatare</strong> (coolere, placă de bază,
          placă video, procesor)
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          Folosim <strong>piese de calitate</strong>, iar fiecare reparație
          beneficiază de {''}
          <strong>garanție între 90 și 365 de zile</strong>.
        </p>
        <hr className="my-4 border-white opacity-25" />
        <h2 className="font-bold text-3xl text-white py-2">
          Cum decurge reparația, pas cu pas?
        </h2>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>1. Recepția produsului</strong>
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          Poți aduce Mac-ul personal la sediul nostru (Str. Știrului, nr. 8A,
          Sector 3, București) sau ni-l poți trimite prin curier rapid.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>2. Diagnoză & ofertă</strong>
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          Analizăm problema pe loc (15 minute) sau în maximum 72 de ore, apoi
          îți oferim detalii despre cost și durată.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>3. Reparația propriu-zisă</strong>
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          După ce ne confirmi că ești de acord cu oferta, ne apucăm de treabă.
          În peste 70% din cazuri, reparația se face pe loc.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>4. Returnarea device-ului</strong>
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          Îți predăm laptopul funcțional, cu garanție inclusă, fie personal, fie
          prin curier.
        </p>
        <hr className="my-4 border-white opacity-25" />
        <h2 className="font-bold text-3xl text-white py-2">
          De ce să ne alegi pe noi?
        </h2>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Constatarea este obligatorie și gratuită</strong> – Peste 10
          ani de reparații Apple.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Tehnician acreditat Apple</strong> – Dar cu libertatea de a
          repara la nivel avansat de circuit.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Rapiditate și eficiență</strong> – Majoritatea reparațiilor se
          rezolvă în câteva zeci de minute.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Prețuri corecte</strong> – Fără costuri ascunse, fără soluții
          inutile de înlocuire totală.
        </p>
        <p className="text-[20px] text-white text-opacity-75 py-2">
          <strong>Garanție la reparații</strong> – Între 90 și 365 de zile, în
          funcție de lucrare.
        </p>
      </div>
    );

    // Optionally, you could also define a header or title for this category.
    const categoryTitle =
      selectedCategory === 2 ? 'Reparații MacBook' : 'Reparații iMac';

    return (
      <motion.div
        variants={fadeIn('up', 'tween', 0.2, 1)}
        initial="hidden"
        animate="show"
        className="mt-12 text-center px-4"
      >
        <h3 className="font-bold text-3xl text-white">{categoryTitle}</h3>
        <motion.p
          variants={fadeIn('up', 'tween', 0.3, 1)}
          initial="hidden"
          animate="show"
          className="mt-12 text-white text-opacity-50 text-[20px]"
        >
          {textContent}
        </motion.p>
      </motion.div>
    );
  }

  return null;
};

export default CategoryContent;
