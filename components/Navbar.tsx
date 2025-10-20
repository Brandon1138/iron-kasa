// components/Navbar.tsx

'use client';

import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles';
import { navVariants } from '../utils/motion';
import ServiceModal from './ServiceModal';

// Import components directly
import SearchBar from './SearchBar';
import BrandLogo from './BrandLogo';
import Menu from './Menu';

import type { iPhoneServiceDetail } from '../constants';

const Navbar = memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] =
    useState<iPhoneServiceDetail | null>(null);
  const [isGraphicsOpen, setIsGraphicsOpen] = useState<boolean>(false);

  // Handlers
  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleToggleSearch = (value: boolean) => {
    setIsSearchOpen(value);
  };

  const handleToggleGraphics = () => {
    setIsGraphicsOpen((prev) => !prev);
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="show"
        className={`${styles.xPaddings} py-8 fixed top-0 left-0 right-0 z-50 bg-primary-black bg-opacity-50 backdrop-blur-md`}
        aria-label="Main Navigation"
      >
        <div
          className={`${styles.innerWidth} mx-auto flex justify-between gap-8 items-center`}
        >
          {/* Search Bar */}
          <SearchBar
            isSearchOpen={isSearchOpen}
            toggleSearch={handleToggleSearch}
            setSelectedService={setSelectedService}
          />

          {/* Brand Logo */}
          <BrandLogo isSearchOpen={isSearchOpen} />

          {/* Menu */}
          <Menu
            isMenuOpen={isMenuOpen}
            toggleMenu={handleToggleMenu}
            isGraphicsOpen={isGraphicsOpen}
            setIsGraphicsOpen={handleToggleGraphics}
          />
        </div>
      </motion.nav>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
