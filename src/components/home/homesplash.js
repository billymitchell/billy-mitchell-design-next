'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';
import BrandMark from '../BrandMark';
import SectionTransition from './SectionTransition';

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
              <h1 className="text-center">Billy Mitchell</h1>
            </div>
            <div className="fade-in-up time-1000ms delay-250ms forwards ease-in-out-quad loop-1">
              <h2 className="text-center">Multidisciplinary Designer</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-down-overlay">
        <img
          alt=""
          className="scroll-down"
          src="https://res.cloudinary.com/billymitchell/image/upload/v1600977106/home/Scrolldown-white_b7xo4m.gif"
        ></img>
      </div>
      <SectionTransition index={0} to="services" heroRef={heroRef} mediaRef={mediaRef} />
    </div>
  )
}
export default Homesplash
