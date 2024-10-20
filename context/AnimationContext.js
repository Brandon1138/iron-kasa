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

  useEffect(() => {
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

  return (
    <AnimationContext.Provider value={{ canAnimate, toggleCanAnimate }}>
      {children}
    </AnimationContext.Provider>
  );
};
