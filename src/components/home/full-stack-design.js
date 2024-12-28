'use client';
import React, { useEffect, useState } from "react"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
// import InViewAnimationThree from "../utilities/InViewAnimationThree"
import { Parallax } from "react-scroll-parallax"
import SeparatorBottom from "../../components/separator-bottom"



const FullStack = () => {
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
      <section id="full-stack" className="home-page-section bg-black mobile-height-fluid small-padding-top-100 small-padding-bottom-100 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-1000">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
                animation="fade-in-up-small"
                duration="time-1000ms"
                delay="delay-0ms"
              >
                <h3>My Perspective</h3>
              </InViewAnimationTwo>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                className="init-invisible"
                animation="fade-in-up-small"
                duration="time-1000ms"
                delay="delay-0ms"
              >
                <p>
                I have a breadth of design skills in many areas with a depth of skills in User Experience Design, User Interface Design, and Frontend Development. I also enjoy taking on projects in Branding, Illustration, Photography, and Motion Graphics. 
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
                    animation="fade-in-up-small"
                    duration="time-1000ms"
                    delay="delay-0ms"
                  >
                    <h4>
                      UX Design
                    </h4>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    animation="fade-in-up-small"
                    duration="time-1000ms"
                    delay="delay-250ms"
                  >
                    <p>
                      Strategy<br />
                        Research<br />
                        Testing
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
                    animation="fade-in-up-small"
                    duration="time-1000ms"
                    delay="delay-1000ms"
                  >
                    <h4>
                      UI Design
                    </h4>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    animation="fade-in-up-small"
                    duration="time-1000ms"
                    delay="delay-1250ms"
                  >
                    <p>
                      Visuals<br />
                      Prototypes<br />
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
                    animation="fade-in-up-small"
                    duration="time-1000ms"
                    delay="delay-2000ms"
                  >
                    <h4>
                      Frontend Development
                    </h4>
                  </InViewAnimationTwo>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    className="init-invisible"
                    animation="fade-in-up-small"
                    duration="time-1000ms"
                    delay="delay-2250ms"
                  >
                    <p>
                      HTML<br />
                      CSS<br />
                      Javascript
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
      <SeparatorBottom className="bg-black" />
    </>
  )
}

export default FullStack
