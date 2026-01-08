'use client';

import React, { useEffect, useState } from "react"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
import { Parallax } from "react-scroll-parallax"
import SeparatorTop from "../separator-top.js"
import SeparatorBottom from "../separator-bottom.js"
import Image from 'next/image'

// Images
import AIchip from "../../../public/tools/AIchip.svg"
import AfterEffects from "../../../public/tools/AfterEffects.svg"
import Illustrator from "../../../public/tools/Illustrator.svg"
import InDesign from "../../../public/tools/InDesign.svg"
import LeftRight from "../../../public/tools/lef-right.svg"
import Photoshop from "../../../public/tools/photoshop.svg"
import Sketching from "../../../public/tools/sketching.png"
import XD from "../../../public/tools/xd.svg"

const toolImages = [
  { src: AIchip, alt: "AI chip" },
  { src: AfterEffects, alt: "After Effects" },
  { src: Illustrator, alt: "Illustrator" },
  { src: InDesign, alt: "InDesign" },
  { src: LeftRight, alt: "Left Right" },
  { src: Photoshop, alt: "Photoshop" },
  { src: Sketching, alt: "Sketching" },
  { src: XD, alt: "XD" },
];

const Tools = () => {
  // Set default state of parallax to enabled / not disabled
  const [parallaxDisabledState, setparallaxDisabledState] = useState(false);

  // .window is not available until after the render - useEffect needed
  useEffect(() => {

    function handleResize() {
      // check for small windows
      if (window.innerWidth <= 800 || window.innerHeight <= 600) {
        // Set true for small screens
        setparallaxDisabledState(true)
        // log state
        console.log("Parallax Disabled", parallaxDisabledState)
      } else {
        // log state
        console.log("Parallax Disabled", parallaxDisabledState)
      }
    }

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // When the window resizes, call handleResize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

  }, [parallaxDisabledState])
  return (
    <>
      <SeparatorTop className="bg-white" />
      <section id="tech-stack" className="home-page-section bg-white small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-1000">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
              >
                <h3>Methods of Action</h3>
              </InViewAnimationTwo>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                delay="delay-250ms"
                className="init-invisible"
              >
                <p>
                  Here are some of the tools, technologies and applications I use to
                  bring ideas to life.
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
                    <Image
                      src={tool.src}
                      alt={tool.alt}
                      className="fluid"
                    />
                  </InViewAnimationTwo>
                ))}
              </div>
            </Parallax>
          </div>
        </div>
      </section>
      <SeparatorBottom className="bg-white" />
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
