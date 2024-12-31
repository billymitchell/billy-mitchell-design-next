'use client';
import '../styles/global.scss';
import Script from 'next/script';
import Header from '../components/header';
import Footer from '../components/footer';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>{/* Metadata and additional head elements can go here */}</head>
      <body>
        {/* External scripts */}
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js" />
        <Script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js" />
        <Script src="https://kit.fontawesome.com/da815149ed.js" />

        <div className="outer-wrapper">
          <div className="main-container">
            {/* <Header /> */}
            <ParallaxProvider>{children}</ParallaxProvider>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
