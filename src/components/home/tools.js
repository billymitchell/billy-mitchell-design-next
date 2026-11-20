'use client';

import SectionTransition from "./SectionTransition";
import React from "react"
import useParallaxDisabled from "../utilities/useParallaxDisabled"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
import { Parallax } from "react-scroll-parallax"
import Image from 'next/image'

// Images
import ChatGPT from "../../../public/tools/chatgpt.svg"
import Claude from "../../../public/tools/claude.svg"
import AfterEffects from "../../../public/tools/AfterEffects.svg"
import Illustrator from "../../../public/tools/Illustrator.svg"
import InDesign from "../../../public/tools/InDesign.svg"
import LeftRight from "../../../public/tools/lef-right.svg"
import Photoshop from "../../../public/tools/photoshop.svg"
import Sketching from "../../../public/tools/sketching.png"
import Figma from "../../../public/tools/figma.svg"
import Canva from "../../../public/tools/canva.svg"

// Ordered like the process: sketch → design → motion/UI → AI assist → the mindset tying it together
const toolImages = [
  { src: Sketching, alt: "Hand sketching" },
  { src: Illustrator, alt: "Adobe Illustrator" },
  { src: Photoshop, alt: "Adobe Photoshop" },
  { src: InDesign, alt: "Adobe InDesign" },
  { src: AfterEffects, alt: "Adobe After Effects" },
  { src: Figma, alt: "Figma", bright: true },
  { src: Canva, alt: "Canva", bright: true },
  { src: Claude, alt: "Claude", bright: true },
  { src: ChatGPT, alt: "ChatGPT" },
  { src: LeftRight, alt: "Creative + technical thinking" },
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

              <div className="teck-stack-container grid-container col-6 col-gap-30 small-col-4 small-col-gap-20">
                {toolImages.map((tool, index) => (
                  <InViewAnimationTwo
                    key={tool.alt}
                    rootMargin="-25% 0%"
                    delay={`delay-${500 + index * 250}ms`}
                    className="init-invisible"
                  >
                    <figure className={`tool-item${tool.bright ? ' tool-item--bright' : ''}`} tabIndex={0}>
                      <Image
                        src={tool.src}
                        alt={tool.alt}
                        className="fluid"
                      />
                      <figcaption className="tool-label" aria-hidden="true">{tool.alt}</figcaption>
                    </figure>
                  </InViewAnimationTwo>
                ))}
              </div>
            </Parallax>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tools


{/* <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-850ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/photoshop-cc_tudva9"
                    alt="Adobe PS"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-900ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/Adobe_Illustrator_CC_icon_rp6dnl"
                    alt="Adobe IL"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-950ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/Adobe_After_Effects_CC_icon_ej67ez"
                    alt="Adobe AE"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-1000ms"
                  className="init-invisible"
                >

                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/Adobe_Premiere_Pro_Logo_ceowzq"
                    alt="Adobe PP"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-1050ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/adobe-xd-logo-svg-vector-01_zw1khl"
                    alt="Adobe XD"
                  /></InViewAnimationTwo> */}
