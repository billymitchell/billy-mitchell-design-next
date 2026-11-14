"use client";
import React from "react"
import useParallaxDisabled from "../utilities/useParallaxDisabled"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js";
import ParallaxWrapper from "../utilities/ParallaxProviderWrapper";

export default function Services({ children }) {
  // Set default state of parallax to enabled / not disabled
  const parallaxDisabledState = useParallaxDisabled();

  return (
    <section
      id="services"
      className="home-page-section bg-green-dark-3 small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100"
    >
      <div className="outer-container">
        <div className="inner-width-1000">
          <ParallaxWrapper disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              delay="delay-0ms"
              className="init-invisible"
            >
              <h3>Services Offered</h3>
            </InViewAnimationTwo>
            <div className="services-container grid-container col-4 small-col-2">
              {children}
            </div>
          </ParallaxWrapper>
        </div>
      </div>
    </section>
  );
}
