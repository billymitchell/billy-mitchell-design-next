'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MorphSVGPlugin } from 'gsap/dist/MorphSVGPlugin';

// Each pair uses the same bottom edge so adjoining section colors stay joined.
const shapes = [
  ['M0,94 L1000,48 V120 H0 Z', 'M0,83 L1000,0 V120 H0 Z'],
  ['M0,52 L1000,98 V120 H0 Z', 'M0,0 L1000,87 V120 H0 Z'],
  ['M0,91 C290,110 700,45 1000,73 V120 H0 Z', 'M0,53 C280,123 680,-44 1000,54 V120 H0 Z'],
  ['M0,88 L370,65 L610,85 L1000,73 V120 H0 Z', 'M0,89 L370,5 L610,62 L1000,24 V120 H0 Z'],
  ['M0,81 Q500,29 1000,81 V120 H0 Z', 'M0,74 Q500,-72 1000,74 V120 H0 Z'],
  ['M0,67 C210,66 290,96 500,96 S790,66 1000,67 V120 H0 Z', 'M0,2 C220,2 280,104 500,104 S780,2 1000,2 V120 H0 Z'],
];

let loadShapes;

function getLoadShapes() {
  if (!loadShapes) {
    loadShapes = [...shapes];
    for (let i = loadShapes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [loadShapes[i], loadShapes[j]] = [loadShapes[j], loadShapes[i]];
    }
  }
  return loadShapes;
}

export default function SectionTransition({ index, from, to, heroRef, mediaRef }) {
  const dividerRef = useRef(null);
  const pathRef = useRef(null);
  const isHero = Boolean(heroRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
    const path = pathRef.current;
    const [startShape, endShape] = getLoadShapes()[index];
    path.setAttribute('d', startShape);

    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = heroRef?.current;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: hero ?? dividerRef.current,
          start: hero ? 'top top' : 'top 95%',
          end: hero ? 'bottom 52%' : 'bottom 38%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      timeline.to(path, { morphSVG: { shape: endShape, shapeIndex: 0 } }, 0);
      if (hero) {
        timeline.to(mediaRef.current, { y: () => Math.min(hero.clientHeight * 0.34, 300) }, 0);
        const heroMark = hero.querySelector('.home-hero-logo svg');
        const menuLink = document.querySelector('header.home .logo');
        const menuMark = menuLink?.querySelector('svg');
        if (heroMark && menuMark) {
          const measure = () => {
            const source = heroMark.getBoundingClientRect();
            const target = menuLink.getBoundingClientRect();
            return {
              x: source.left + source.width / 2 - target.left - target.width / 2,
              y: source.top + window.scrollY + source.height / 2 - target.top - target.height / 2,
              scale: source.width / target.width,
            };
          };
          gsap.set(heroMark, { opacity: 0 });
          const logoTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: 'top top',
              end: () => '+=' + gsap.utils.clamp(150, 260, hero.clientHeight * 0.3),
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
          logoTimeline.fromTo(menuMark, {
            x: () => measure().x,
            y: () => measure().y,
            scale: () => measure().scale,
          }, { x: 0, y: 0, scale: 1, ease: 'none' });
          const intro = hero.querySelector('.home-hero-logo lottie-player');
          logoTimeline
            .fromTo(intro, { opacity: 1 }, { opacity: 0, duration: 0.12 }, 0)
            .fromTo(menuMark, { '--intro-mark-opacity': 0 }, {
              '--intro-mark-opacity': 1,
              duration: 0.12,
            }, 0);
        }
      }
    });

    return () => motion.revert();
  }, [heroRef, index, mediaRef]);

  return (
    <svg
      ref={dividerRef}
      className={isHero ? 'section-transition section-transition--hero' : 'section-transition'}
      data-from={from}
      data-to={to}
      viewBox="0 0 1000 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path ref={pathRef} d={shapes[index][0]} />
    </svg>
  );
}
