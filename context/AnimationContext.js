// context/AnimationContext.js

import React, { createContext, useState, useEffect } from 'react';
import {
  detectFrameRate,
  getStoredFrameRate,
} from '../utils/frameRateDetection';

// Create the context with default values
export const AnimationContext = createContext({
  canAnimate: false,
  toggleCanAnimate: () => {},
});

// AnimationProvider component
export const AnimationProvider = ({ children }) => {
  const [automaticCanAnimate, setAutomaticCanAnimate] = useState(false);
  const [userCanAnimate, setUserCanAnimate] = useState(null); // null indicates no user preference
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Mark as mounted after client-side hydration

    // Retrieve user preference from localStorage
    const storedUserCanAnimate = localStorage.getItem('userCanAnimate');
    if (storedUserCanAnimate !== null) {
      setUserCanAnimate(JSON.parse(storedUserCanAnimate));
    } else {
      // If no user preference, use automatic frame rate detection
      const storedCanAnimate = getStoredFrameRate();
      if (storedCanAnimate !== null) {
        setAutomaticCanAnimate(storedCanAnimate);
      } else {
        detectFrameRate().then((result) => {
          setAutomaticCanAnimate(result);
        });
      }
    }
  }, []);

  // Function to toggle user preference
  const toggleCanAnimate = () => {
    const newValue = userCanAnimate === null ? true : !userCanAnimate;
    setUserCanAnimate(newValue);
    localStorage.setItem('userCanAnimate', JSON.stringify(newValue));
  };

  // Determine the final canAnimate value
  const canAnimate =
    userCanAnimate !== null ? userCanAnimate : automaticCanAnimate;

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) {
    return null; // Or a loading spinner if preferred
  }

  return (
    <AnimationContext.Provider value={{ canAnimate, toggleCanAnimate }}>
      {children}
      {/* Portal Root for Modals */}
      <div id="modal-root"></div>
    </AnimationContext.Provider>
  );
};
