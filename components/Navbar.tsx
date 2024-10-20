// components/Navbar.tsx

'use client';

import React, { useState, Suspense, memo, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from '../styles';
import { navVariants } from '../utils/motion';
import ServiceModal from './ServiceModal';
import ErrorBoundary from './ErrorBoundary';

// Define Prop Interfaces for Dynamic Components
interface SearchBarProps {
  isSearchOpen: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedService: React.Dispatch<React.SetStateAction<string | null>>;
}

interface BrandLogoProps {
  isSearchOpen: boolean;
}

interface MenuProps {
  isMenuOpen: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isGraphicsOpen: boolean;
  setIsGraphicsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Dynamic Imports with Proper Typing and Client-Side Rendering
const SearchBar = dynamic<SearchBarProps>(() => import('./SearchBar'), {
  suspense: true,
  // Ensure it's treated as a client component
  ssr: false,
});

const BrandLogo = dynamic<BrandLogoProps>(() => import('./BrandLogo'), {
  suspense: true,
  ssr: false,
});

const Menu = dynamic<MenuProps>(() => import('./Menu'), {
  suspense: true,
  ssr: false,
});

const Navbar = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isGraphicsOpen, setIsGraphicsOpen] = useState<boolean>(false);

  // Wrap state updates in startTransition for smoother hydration handling
  const handleToggleMenu = () => {
    startTransition(() => {
      setIsMenuOpen((prev) => !prev);
    });
  };

  const handleToggleSearch = () => {
    startTransition(() => {
      setIsSearchOpen((prev) => !prev);
    });
  };

  const handleToggleGraphics = () => {
    startTransition(() => {
      setIsGraphicsOpen((prev) => !prev);
    });
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
          <ErrorBoundary>
            <Suspense
              fallback={<div className="w-24 h-24 bg-gray-700 rounded" />}
            >
              {/* Search Bar */}
              <SearchBar
                isSearchOpen={isSearchOpen}
                toggleSearch={handleToggleSearch}
                setSelectedService={setSelectedService} // Pass setSelectedService directly
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense
              fallback={<div className="w-24 h-24 bg-gray-700 rounded" />}
            >
              {/* Brand Logo */}
              <BrandLogo isSearchOpen={isSearchOpen} />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense
              fallback={<div className="w-24 h-24 bg-gray-700 rounded" />}
            >
              {/* Menu */}
              <Menu
                isMenuOpen={isMenuOpen}
                toggleMenu={handleToggleMenu}
                isGraphicsOpen={isGraphicsOpen}
                setIsGraphicsOpen={handleToggleGraphics}
              />
            </Suspense>
          </ErrorBoundary>
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
