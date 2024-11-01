// Socials.jsx
import React from 'react';
import Image from 'next/image';
import { socials } from '../../constants';

const Socials = () => {
  return (
    <div className="flex gap-4">
      {socials.map((social) => (
        <a
          href={social.link}
          key={social.name}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Link to ${social.name}`}
        >
          <Image
            src={social.url}
            alt={social.name}
            width={24}
            height={24}
            className="object-contain cursor-pointer"
          />
        </a>
      ))}
    </div>
  );
};

export default Socials;
