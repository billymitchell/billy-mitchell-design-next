'use client';

import SectionTransition from "./SectionTransition";
import React from "react"
import useParallaxDisabled from "../utilities/useParallaxDisabled"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
import { Parallax } from "react-scroll-parallax"

// Our own marks, drawn in the same 24px line style as the Services icons.
const SketchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 3l4 4L8.5 17.5h-4v-4z" />
    <path d="M13 5l4 4" />
    <path d="M4 21c2.5-1.6 4.5-1.6 6.5-.4s4 1.2 6.5-.4 3.5-1 3.5-1" />
  </svg>
)

// Brand marks are shown in one colour (their own artwork, recoloured) and
// reveal their brand colours on hover. `scale` evens out optical size.
const tools = [
  { label: "Sketching", icon: <SketchIcon /> },
  { label: "Illustrator", mono: "/tools/mono/Illustrator.svg", color: "/tools/Illustrator.svg", scale: 0.86 },
  { label: "Photoshop", mono: "/tools/mono/photoshop.svg", color: "/tools/photoshop.svg", scale: 0.86 },
  { label: "InDesign", mono: "/tools/mono/InDesign.svg", color: "/tools/InDesign.svg", scale: 0.86 },
  { label: "After Effects", mono: "/tools/mono/AfterEffects.svg", color: "/tools/AfterEffects.svg", scale: 0.86 },
  { label: "Figma", mono: "/tools/figma.svg", color: "/tools/figma.svg", scale: 1.05 },
  { label: "Canva", mono: "/tools/canva.svg", color: "/tools/canva.svg", scale: 0.92 },
  { label: "Claude", mono: "/tools/claude.svg", color: "/tools/claude.svg", scale: 1 },
  { label: "ChatGPT", mono: "/tools/chatgpt.svg", color: "/tools/chatgpt.svg", scale: 1 },
  { label: "GitHub", mono: "/tools/github.svg", color: "/tools/github.svg", scale: 0.92 },
];

const Tools = () => {
  // Set default state of parallax to enabled / not disabled
  const parallaxDisabledState = useParallaxDisabled();
  return (
    <>
      <SectionTransition index={2} from="approach" to="tools" />
      <section id="tech-stack" className="home-page-section bg-bone small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-1000">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
              >
                <h2 className="section-title" data-eyebrow="03 — Toolkit">Design and Development Tools</h2>
              </InViewAnimationTwo>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                delay="delay-250ms"
                className="init-invisible"
              >
                <p>
                  Our team uses these tools for interface design, development, and production.
              </p>
              </InViewAnimationTwo>

              <ul className="tool-grid" role="list">
                {tools.map((tool, index) => (
                  <InViewAnimationTwo
                    key={tool.label}
                    as="li"
                    rootMargin="-25% 0%"
                    // 150ms stagger keeps all ten within the delay classes (max 2250ms).
                    delay={`delay-${500 + index * 150}ms`}
                    className="init-invisible"
                  >
                    <figure className={`tool-tile${tool.icon ? ' tool-tile--own' : ''}`}>
                      <span className="tool-tile__box" style={{ '--mark-scale': tool.scale ?? 1 }}>
                        {tool.icon ?? (
                          <>
                            <span className="tool-tile__mono" style={{ '--mark': `url(${tool.mono})` }} aria-hidden="true" />
                            <img className="tool-tile__color" src={tool.color} alt="" loading="lazy" decoding="async" />
                          </>
                        )}
                      </span>
                      <figcaption className="tool-tile__label">{tool.label}</figcaption>
                    </figure>
                  </InViewAnimationTwo>
                ))}
              </ul>
            </Parallax>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tools
