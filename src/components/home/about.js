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
                  <h3>I&apos;m Billy Mitchell, a multidisciplinary designer from Baltimore Maryland.</h3>
                </InViewAnimationTwo>
                <div className="grid-container col-1-2 col-gap-30 small-col-1">
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
                        <img className="border-box fluid clip-circular padding-6 border-r-full bg-gradient max-width-60vw center" src="https://res.cloudinary.com/billymitchell/image/upload/f_auto,q_auto,c_limit,w_800/home/PhotoByMicahEWood-156-web.jpg" alt="Billy Mitchell headshot" loading="lazy" decoding="async" />
                      </Tilt>
                    </InViewAnimationTwo>
                  </div>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    animationdelay="delay-500ms"
                    className="init-invisible"
                  >
                     <p>
                      I am a designer with {new Date().getFullYear() - 2012}+ years of experience who operates the agency Billy Mitchell Design. I contract on an ongoing basis in addition to availability as a full-time employee. I&apos;ve worked with everyone from small businesses to fortune 500 companies. I apply design thinking, leverage human-centered design principles, and build solutions to complex problems. I&apos;ve obtained a BFA in Design from the University of Maryland, Baltimore County and went to Baltimore School for the Arts for high school where I studied visual arts.<br />
                      <br />
                      Accomplishments Include<br />
                      </p>
                      <ul>
                        <li>Publication of the Baltimore Love Project Book (Layout Designer)</li>
                        <li>Illustration published in the Baltimore City Paper</li>
                        <li>Obtaining the Baltimore Midtown Development Award (Assistant Muralist)</li>
                      </ul>
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
