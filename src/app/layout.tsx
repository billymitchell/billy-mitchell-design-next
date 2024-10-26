// app/layout.tsx
"use client";
import '../styles/global.scss';
import Script from 'next/script';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { GlobalStateProvider } from './context/setGlobalState';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Metadata and additional head elements can go here */}
      </head>
      <body>
        {/* External scripts */}
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js" />
        <Script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js" />
        <Script src="https://kit.fontawesome.com/da815149ed.js" />

        <GlobalStateProvider>
          <div className="outer-wrapper">
            <div className="main-container">
              <Header />
              {children}
            </div>
          </div>
          <Footer />
        </GlobalStateProvider>
      </body>
    </html>
  );
}
