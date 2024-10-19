'use client';

import React, { useRef, useEffect, useContext, memo, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AnimationContext } from '../context/AnimationContext';

const Menu = memo(({ isMenuOpen, toggleMenu, isGraphicsOpen, setIsGraphicsOpen }) => {
  const { canAnimate, toggleCanAnimate } = useContext(AnimationContext);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const firstMenuItemRef = useRef(null);

  // Close the menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen
        && menuRef.current
        && !menuRef.current.contains(event.target)
        && buttonRef.current
        && !buttonRef.current.contains(event.target)
      ) {
        startTransition(() => {
          toggleMenu(false);
          setIsGraphicsOpen(false);
        });
      }
    };

    const handleScroll = () => {
      if (isMenuOpen || isGraphicsOpen) {
        startTransition(() => {
          if (isMenuOpen) toggleMenu(false);
          if (isGraphicsOpen) setIsGraphicsOpen(false);
        });
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        startTransition(() => {
          if (isMenuOpen) toggleMenu(false);
          if (isGraphicsOpen) setIsGraphicsOpen(false);
        });
      }
    };

    if (isMenuOpen || isGraphicsOpen) {
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
  }, [isMenuOpen, isGraphicsOpen, toggleMenu, setIsGraphicsOpen]);

  // Trap focus within the menu when it's open
  useEffect(() => {
    const focusableElementsString = 'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]';
    const menuNode = menuRef.current;
    const focusableElements = menuNode
      ? menuNode.querySelectorAll(focusableElementsString)
      : [];
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    const handleTrapFocus = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        // Shift + Tab and at the first focusable element
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        // Tab and at the last focusable element
        e.preventDefault();
        firstFocusableElement.focus();
      }
    };

    if (isMenuOpen) {
      if (firstFocusableElement) {
        setTimeout(() => {
          firstFocusableElement.focus();
        }, 0);
      }
      if (menuNode) {
        menuNode.addEventListener('keydown', handleTrapFocus);
      }
    }

    return () => {
      if (menuNode) {
        menuNode.removeEventListener('keydown', handleTrapFocus);
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Toggle Menu Button */}
      <button
        type="button"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        className="w-[24px] h-[24px] object-contain cursor-pointer rounded z-60"
        onClick={() => startTransition(() => toggleMenu(!isMenuOpen))}
        ref={buttonRef}
      >
        <Image src="/menu.svg" alt="Menu Icon" width={24} height={24} />
      </button>

      {/* Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => startTransition(() => toggleMenu(false))}
              aria-hidden="true"
            />

            {/* Menu Content */}
            <motion.div
              className="fixed top-6 right-6 z-50 p-6 rounded-3xl w-64 bg-primary-black bg-opacity-90 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-heading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              ref={menuRef}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="menu-heading" className="sr-only">
                Navigation Menu
              </h2>
              <ul className="flex flex-col space-y-4">
                {/* Menu Items */}
                {['Acasă', 'Despre noi', 'Servicii', 'Transport', 'Testimoniale', 'Contact'].map(
                  (item, index) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                        className="text-white text-lg transition-all duration-300 ease-in-out hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-600 hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate rounded"
                        onClick={() => startTransition(() => toggleMenu(false))}
                        ref={index === 0 ? firstMenuItemRef : null}
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
                {/* Separator */}
                <li>
                  <hr className="border-gray-700" />
                </li>
                {/* Graphics Menu Item */}
                <li>
                  <button
                    type="button"
                    className="relative text-white text-lg transition-all duration-300 ease-in-out hover:bg-clip-text hover:-webkit-background-clip-text hover:font-bold-animate w-full text-left flex items-center justify-between rounded"
                    onClick={() => startTransition(() => setIsGraphicsOpen(!isGraphicsOpen))}
                    aria-expanded={isGraphicsOpen}
                    aria-controls="graphics-settings-menu-mobile"
                  >
                    <span>Graphics</span>
                    {/* Icon for expanding/collapsing */}
                    <span className="relative z-10 transform transition-transform duration-200 text-white">
                      {isGraphicsOpen ? '▲' : '▼'}
                    </span>
                  </button>
                  {/* Graphics Settings */}
                  <AnimatePresence>
                    {isGraphicsOpen && (
                      <motion.div
                        id="graphics-settings-menu-mobile"
                        className="mt-2 pl-0" // Updated padding
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="flex items-center justify-start text-white text-sm">
                          <span className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={canAnimate}
                              onChange={toggleCanAnimate}
                              className="sr-only peer"
                              aria-label="Toggle Animated Glow"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600" />
                          </span>
                          <span className="ml-2">Toggle Animated Glow</span>
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Menu;
