import type { ReactNode } from 'react';
import '../styles/globals.css';
import ClientProviders from './ClientProviders';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://stijndv.com" />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </head>
      <body>
        <ClientProviders>
          {children}
          {/* Portal Root for Modals */}
          <div id="modal-root" />
        </ClientProviders>
      </body>
    </html>
  );
}
