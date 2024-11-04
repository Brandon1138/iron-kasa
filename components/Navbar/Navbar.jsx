// Navbar.jsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles';
import { navVariants } from '../../utils/motion';
import SearchBar from './SearchBar';
import BrandLogo from '../common/BrandLogo';
import Menu from './Menu';

const Navbar = ({ onServiceSelect }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Handle clicking on a search result
  const handleResultClick = (iphone) => {
    onServiceSelect(iphone);
  };

  // Close the menu and search bar when clicking outside, scrolling, or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close Menu if clicking outside
      if (
        isMenuOpen
        && menuRef.current
        && !menuRef.current.contains(event.target)
        && buttonRef.current
        && !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }

      // Close Search Bar if clicking outside
      if (
        isSearchOpen
        && searchContainerRef.current
        && !searchContainerRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
      if (isSearchOpen) setIsSearchOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };

    if (isMenuOpen || isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, isSearchOpen]);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`${styles.xPaddings} py-6 fixed top-0 left-0 right-0 z-50 bg-primary-black bg-opacity-50 backdrop-blur-md`}
      aria-label="Main Navigation"
    >
      <div
        className={`${styles.innerWidth} mx-auto flex justify-between gap-8 items-center`}
      >
        {/* SearchBar Component */}
        <SearchBar
          onResultClick={handleResultClick}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          searchContainerRef={searchContainerRef}
        />

        {/* BrandLogo Component */}
        <BrandLogo isHidden={isSearchOpen} />

        {/* Menu Component */}
        <Menu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          toggleMenu={toggleMenu}
          menuRef={menuRef}
          buttonRef={buttonRef}
        />
      </div>
    </motion.nav>
  );
};

export default Navbar;
