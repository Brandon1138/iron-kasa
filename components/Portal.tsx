// components/Portal.jsx

'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps): ReactNode => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? createPortal(children, modalRoot) : null;
};

export default Portal;
