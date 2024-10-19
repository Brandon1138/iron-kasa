'use client';

import React, { useState, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from '../styles';
import { navVariants } from '../utils/motion';
import ServiceModal from './ServiceModal';
import ErrorBoundary from './ErrorBoundary'; // Ensure you have an ErrorBoundary component

// Lazy load child components
const SearchBar = dynamic(() => import('./SearchBar'), {
  suspense: true,
});
const BrandLogo = dynamic(() => import('./BrandLogo'), {
  suspense: true,
});
const Menu = dynamic(() => import('./Menu'), {
  suspense: true,
});

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isGraphicsOpen, setIsGraphicsOpen] = useState(false);

  // Removed toggleCanAnimate since it's not used
  // const toggleCanAnimate = useCallback(() => {
  //   // This function should be handled within the AnimationContext
  //   // It's passed down to child components
  // }, []);

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="show"
        className={`${styles.xPaddings} py-8 fixed top-0 left-0 right-0 z-50 bg-primary-black bg-opacity-50 backdrop-blur-md`}
        aria-label="Main Navigation"
      >
        <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8 items-center`}>
          <ErrorBoundary>
            <Suspense fallback={<div className="w-24 h-24 bg-gray-700 rounded" />}>
              {/* Search Bar */}
              <SearchBar
                isSearchOpen={isSearchOpen}
                toggleSearch={setIsSearchOpen}
                setSelectedService={setSelectedService}
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<div className="w-24 h-24 bg-gray-700 rounded" />}>
              {/* Brand Logo */}
              <BrandLogo isSearchOpen={isSearchOpen} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<div className="w-24 h-24 bg-gray-700 rounded" />}>
              {/* Menu */}
              <Menu
                isMenuOpen={isMenuOpen}
                toggleMenu={setIsMenuOpen}
                isGraphicsOpen={isGraphicsOpen}
                setIsGraphicsOpen={setIsGraphicsOpen}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </motion.nav>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
