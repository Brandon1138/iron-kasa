// components/WordFlipWrapper.jsx

'use client';

import { useEffect, useState } from 'react';
import WordFlip from './WordFlip';

const WordFlipWrapper = (): JSX.Element => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <span className="relative inline-block">
      <span
        className={`transition-opacity duration-500 ${
          isClient ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Apple
      </span>
      <span
        className={`absolute top-0 left-0 transition-opacity duration-500 ${
          isClient ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <WordFlip />
      </span>
    </span>
  );
};

export default WordFlipWrapper;
