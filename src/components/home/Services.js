"use client";
import React, { useEffect, useState } from "react";
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js";
import ParallaxWrapper from "../utilities/ParallaxProviderWrapper";
import SeparatorTop from "../separator-top";
import SeparatorBottom from "../separator-bottom";

export default function Services({ children }) {
  // Set default state of parallax to enabled / not disabled
  const [parallaxDisabledState, setParallaxDisabledState] = useState(false);

  // .window is not available until after the render - useEffect needed
  useEffect(() => {
    function handleResize() {
      // Check for small windows
      if (window.innerWidth <= 800 || window.innerHeight <= 600) {
        // Set true for small screens
        setParallaxDisabledState(true);
        console.log("Parallax Disabled", true);
      } else {
        setParallaxDisabledState(false);
        console.log("Parallax Disabled", false);
      }
    }

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // When the window resizes, call handleResize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <SeparatorTop className="bg-green-dark-3" />
      <section
        id="services"
        className="home-page-section bg-green-dark-3 small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100"
      >
        <div className="outer-container">
          <div className="inner-width-1000">
            <ParallaxWrapper disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <InViewAnimationTwo
                rootMargin="-25% 0%"
                animationdelay="delay-0ms"
                className="init-invisible"
              >
                <h3>Services Offered</h3>
              </InViewAnimationTwo>
              <div className="services-container grid-container col-5 small-col-2">
                {children}
              </div>
            </ParallaxWrapper>
          </div>
        </div>
      </section>
      <SeparatorBottom className="bg-green-dark-3" />
    </>
  );
}
