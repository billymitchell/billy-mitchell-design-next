'use client';
import SectionTransition from "./SectionTransition";
import React from "react"
import useParallaxDisabled from "../utilities/useParallaxDisabled"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
// import InViewAnimationThree from "../utilities/InViewAnimationThree"
import { Parallax } from "react-scroll-parallax"



const FullStack = () => {
  // Set default state of parallax to enabled / not disabled
  const parallaxDisabledState = useParallaxDisabled();
  return (
    <>
      <SectionTransition index={1} from="services" to="approach" />
      <section id="full-stack" className="home-page-section bg-ink mobile-height-fluid small-padding-top-100 small-padding-bottom-100 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-1000">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
                duration="time-1000ms"
                delay="delay-0ms"
              >
                <h2 className="section-title" data-eyebrow="02 — How we work">Our Approach</h2>
              </InViewAnimationTwo>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
                duration="time-1000ms"
                delay="delay-250ms"
              >
                <p>
                We start by understanding what your customers and team need. That informs what we design, what we build, and how we evaluate the result.
              </p>
              </InViewAnimationTwo>

              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
              >
                <h3 className="section-subtitle">Made by hand. Sharpened with AI.</h3>
              </InViewAnimationTwo>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
                delay="delay-250ms"
              >
                <p>
                  Every project starts with people: sketches, conversations, and design decisions made by hand. Billy and our team shape the ideas, the visual direction, and the details that make the work feel like yours. AI is one of our tools. We use it to speed up repetitive tasks and test more options, but it never replaces taste, judgment, or the final call.
                </p>
              </InViewAnimationTwo>

              <div className="fullstack-container">
                <div className="ux">
                  <InViewAnimationTwo
                    rootMargin="-20% 0%"
                    className="init-height-none l-bar"
                    animation="grow-height"
                    duration="time-1500ms"
                    delay="delay-0ms"
                  >
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    duration="time-1000ms"
                    delay="delay-0ms"
                  >
                    <h4>
                      Thinking
                    </h4>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    duration="time-1000ms"
                    delay="delay-250ms"
                  >
                    <p>
                      Conversations<br />
                      Research<br />
                      Sketching by hand
                      </p>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-20% 0%"
                    className="init-width-none b-bar"
                    animation="grow-width"
                    duration="time-2000ms"
                    delay="delay-0ms"
                  >
                  </InViewAnimationTwo>
                </div>
                <div className="ui">
                  <InViewAnimationTwo
                    rootMargin="-20% 0%"
                    className="init-height-none l-bar"
                    animation="grow-height"
                    duration="time-1500ms"
                    delay="delay-1000ms"
                  >
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    duration="time-1000ms"
                    delay="delay-1000ms"
                  >
                    <h4>
                      Action
                    </h4>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    duration="time-1000ms"
                    delay="delay-1250ms"
                  >
                    <p>
                      Visuals<br />
                      Identity<br />
                      Design Systems
                    </p>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-20% 0%"
                    className="init-width-none b-bar"
                    animation="grow-width"
                    duration="time-2000ms"
                    delay="delay-1000ms"
                  >
                  </InViewAnimationTwo>
                </div>
                <div className="front-end-dev">
                  <InViewAnimationTwo
                    rootMargin="-20% 0%"
                    className="init-height-none l-bar"
                    animation="grow-height"
                    duration="time-1500ms"
                    delay="delay-2000ms"
                  >
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    duration="time-1000ms"
                    delay="delay-2000ms"
                  >
                    <h4>
                      Impact
                    </h4>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    duration="time-1000ms"
                    delay="delay-2250ms"
                  >
                    <p>
                      Work that feels like you<br />
                      Measurable results
                    </p>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-20% 0%"
                    className="init-width-none b-bar"
                    animation="grow-width"
                    duration="time-2000ms"
                    delay="delay-2000ms"
                  >
                  </InViewAnimationTwo>
                </div>
              </div>

            </Parallax>
          </div>
        </div>
      </section>
    </>
  )
}

export default FullStack
