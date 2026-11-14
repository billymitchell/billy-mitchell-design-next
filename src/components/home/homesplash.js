'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';
import BrandMark from '../BrandMark';
import SectionTransition from './SectionTransition';
import Link from 'next/link';

const Homesplash = () => {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const player = introRef.current;
    const finish = () => player.removeAttribute('data-playing');
    const start = () => player.setAttribute('data-playing', 'true');
    player.addEventListener('play', start);
    player.addEventListener('complete', finish);
    player.addEventListener('error', finish);
    return () => {
      player.removeEventListener('play', start);
      player.removeEventListener('complete', finish);
      player.removeEventListener('error', finish);
    };
  }, []);

  return (
    <div className="video-wrapper-home" ref={heroRef}>
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@0.4.0/dist/lottie-player.js"
        strategy="afterInteractive"
      />
      <div className="home-hero-media" ref={mediaRef}>
        <video
          className="homepage-video-file"
          crossOrigin="anonymous"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          id="homepage-video-file"
        >
          <source
            src="https://res.cloudinary.com/billymitchell/video/upload/f_auto,vc_auto/home/Billy-Mitchell-Design-Home-Video_zgl0dp"
          ></source>
        </video>
      </div>
      <div className="overlay-content">
        <div className="outer-container">
          <div className="inner-width">
            <div className="home-hero-logo" aria-hidden="true">
              <BrandMark />
              <lottie-player
                ref={introRef}
                src="https://assets4.lottiefiles.com/private_files/lf30_xRpJ98.json"
                background="transparent"
                speed="1"
                autoplay
              />
            </div>
            {/* CSS-only entrance: the LCP text never waits on JavaScript */}
            <div className="fade-in-up time-1000ms delay-0ms forwards ease-in-out-quad loop-1">
              <h1 className="text-center">Design and development for brands, websites, and applications</h1>
            </div>
            <div className="fade-in-up time-1000ms delay-250ms forwards ease-in-out-quad loop-1">
              <p className="text-center">
                We create brand identities, build websites and custom applications, and automate the workflows that keep your business running. Billy Mitchell leads creative direction and technical delivery across our team.
              </p>
              <div className="home-hero-actions">
                <a className="button" href="#services">View Services</a>
                <Link className="button button-primary" href="/contact">Start a Project</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="home-scroll-link" href="#services" aria-label="Scroll to services">
        <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
          <path d="m2 3 11 11L24 3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </a>
      <SectionTransition index={0} to="services" heroRef={heroRef} mediaRef={mediaRef} />
    </div>
  )
}
export default Homesplash
