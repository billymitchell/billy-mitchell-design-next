'use client';

import React, { useEffect, useState } from "react"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
import { Parallax } from "react-scroll-parallax"
import SeparatorTop from "../../components/separator-top"
import SeparatorBottom from "../../components/separator-bottom"
import Image from 'next/image'
import nodejs from '../../../public/techstack/nodejs.svg'
import nextLogo from '../../../public/techstack/nextjs.svg'
import creativeCloudLogo from '../../../public/techstack/Adobe Creative Cloud.png'

const TechStack = () => {
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
                <h3>Tech Stack</h3>
              </InViewAnimationTwo>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                delay="delay-250ms"
                className="init-invisible"
              >
                <p>
                  Here are some of the technologies and applications I use to
                  bring ideas to life.
              </p>
              </InViewAnimationTwo>

              <div className="teck-stack-container grid-container col-6 col-gap-30 small-col-4 small-col-gap-20">
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-500ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/HTML5_logo_and_wordmark_hpthcm"
                    alt="HTML"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-550ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/CSS3_logo_and_wordmark_mkbbgs"
                    alt="CSS"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-600ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/sass-1_bkguwu"
                    alt="Sass"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-650ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/Unofficial_JavaScript_logo_2_fetebo"
                    alt="Javascript"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-700ms"
                  className="init-invisible"
                >
                  <Image
                    src={nodejs}
                    alt="nodejs"
                    className="fluid"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-750ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/React-icon_sppngx"
                    alt="React"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-800ms"
                  className="init-invisible"
                >
                  <Image
                    src={nextLogo}
                    alt="nextLogo"
                    className="fluid"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-850ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/Git-logo-01_vzwkrs"
                    alt="Git Worflow"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  delay="delay-900ms"
                  className="init-invisible"
                >
                  <Image
                    src={creativeCloudLogo}
                    alt="creativeCloudLogo"
                    className="fluid"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo

                  rootMargin="-25% 0%"
                  delay="delay-1000ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/Figma-logo_hpsrgq"
                    alt="Figma"
                  />
                </InViewAnimationTwo>
                <InViewAnimationTwo
                  // 
                  rootMargin="-25% 0%"
                  delay="delay-1100ms"
                  className="init-invisible"
                >
                  <img
                    className="fluid"
                    src="https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/tech-stack/wordpress"
                    alt="Wordpress"
                  />
                </InViewAnimationTwo>
              </div>
            </Parallax>
          </div>
        </div>
      </section>
      <SeparatorBottom className="bg-white" />
    </>
  )
}

export default TechStack


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