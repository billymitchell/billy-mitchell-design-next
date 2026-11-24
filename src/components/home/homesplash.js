'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';
import BrandMark from '../BrandMark';
import SectionTransition from './SectionTransition';
import GrainGradient from './GrainGradient';
import Link from 'next/link';

const Homesplash = () => {
  const heroRef = useRef(null);
  const mediaRef = useRef(null);
  const introRef = useRef(null);
  const scrollCueRef = useRef(null);

  // The scroll cue has done its job once the visitor starts scrolling.
  useEffect(() => {
    const cue = scrollCueRef.current;
    const update = () => cue.toggleAttribute('data-hidden', window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

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
        <GrainGradient />
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
              <h1 className="text-center">
                Design and development for{' '}
                <span className="hero-brush">
                  brands
                  <svg className="hero-brush__stroke" viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M4 12 C 38 6, 82 4, 126 6 S 186 11, 196 6" pathLength="1" />
                  </svg>
                </span>
                , websites, and applications
              </h1>
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
      <a className="home-scroll-link" ref={scrollCueRef} href="#services" aria-label="Scroll to services">
        <span className="home-scroll-link__label" aria-hidden="true">Scroll</span>
        <svg className="home-scroll-link__chevron" width="22" height="14" viewBox="0 0 26 18" fill="none" aria-hidden="true">
          <path d="m2 3 11 11L24 3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </a>
      <SectionTransition index={0} to="services" heroRef={heroRef} mediaRef={mediaRef} />
    </div>
  )
}
export default Homesplash
