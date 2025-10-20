import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import {
  detectFrameRate,
  getStoredFrameRate,
} from '../utils/frameRateDetection';

interface AnimationContextValue {
  canAnimate: boolean;
  toggleCanAnimate: () => void;
}

export const AnimationContext = createContext<AnimationContextValue | undefined>(
  undefined,
);

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
  const [automaticCanAnimate, setAutomaticCanAnimate] =
    useState<boolean>(false);
  const [userCanAnimate, setUserCanAnimate] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    const storedUserCanAnimate = localStorage.getItem('userCanAnimate');
    if (storedUserCanAnimate !== null) {
      setUserCanAnimate(JSON.parse(storedUserCanAnimate) as boolean);
    } else {
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

  const toggleCanAnimate = () => {
    const newValue = userCanAnimate === null ? true : !userCanAnimate;
    setUserCanAnimate(newValue);
    localStorage.setItem('userCanAnimate', JSON.stringify(newValue));
  };

  const canAnimate =
    userCanAnimate !== null ? userCanAnimate : automaticCanAnimate;

  if (!mounted) {
    return null;
  }

  return (
    <AnimationContext.Provider value={{ canAnimate, toggleCanAnimate }}>
      {children}
      <div id="modal-root" />
    </AnimationContext.Provider>
  );
};
