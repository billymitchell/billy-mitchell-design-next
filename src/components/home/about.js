'use client';
import SectionTransition from "./SectionTransition";
import React from "react"
import useParallaxDisabled from "../utilities/useParallaxDisabled"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
import { Parallax } from "react-scroll-parallax"
import { Tilt } from 'react-tilt'
// https://github.com/jonathandion/react-tilt
// import Separator from "../../components/separator"



const About = () => {
  // Set default state of parallax to enabled / not disabled
  const parallaxDisabledState = useParallaxDisabled();
  return (
    <>
      <SectionTransition index={4} from="experience" to="about" />
      <section id="about" className="home-page-section bg-gray-1 mobile-height-fluid small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-800">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <div className="container">
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  className="init-invisible"
                >
                  <h2>About the Agency</h2>
                </InViewAnimationTwo>
                <div className="grid-container col-1-2 col-gap-30 small-col-1 about-layout">
                  <div className="align-self-center">

                    <InViewAnimationTwo

                      rootMargin="-25% 0%"
                      className="init-invisible"
                    >
                      <Tilt className="Tilt"
                        options={{
                          perspective: 1000,
                          scale: 1.1,
                          speed: 1000,
                          transition: true,
                          reset: true,
                          reverse: true,
                        }}
                      >
                        <img className="border-box fluid about-portrait clip-circular padding-6 border-r-full bg-gradient max-width-60vw center" src="/files/billy-mitchell-portrait.jpg" alt="Billy Mitchell outdoors" loading="lazy" decoding="async" />
                      </Tilt>
                    </InViewAnimationTwo>
                  </div>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    animationdelay="delay-500ms"
                    className="init-invisible"
                  >
                    <p>
                      Billy Mitchell Design &amp; Development is a Baltimore-based agency. Billy leads creative direction and technical delivery, from the first conversations about what you need through design, development, and launch.
                    </p>
                    <p>
                      Our team designs brand identities and builds websites, Shopify storefronts, and custom applications. We also connect the tools businesses already use through APIs and workflow automation.
                    </p>
                    <p>
                      Billy brings experience in graphic design and full-stack development, including building and maintaining e-commerce stores and developing custom integrations at Centricity.
                    </p>
                    <p>
                      <a href="/files/Billy-Mitchell-Resume-Design-2026.pdf">View Billy Mitchell’s résumé</a>
                    </p>
                  </InViewAnimationTwo>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section >
      <SectionTransition index={5} from="about" to="contact" />
    </>
  )
}

export default About
