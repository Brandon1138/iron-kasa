// app/ClientProviders.js

'use client';

import type { ReactNode } from 'react';
import { AnimationProvider } from '../context/AnimationContext';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return <AnimationProvider>{children}</AnimationProvider>;
}
