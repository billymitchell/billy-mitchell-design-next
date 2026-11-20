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
      className="home-page-section bg-bone small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100"
    >
      <div className="outer-container">
        <div className="inner-width-1000">
          <ParallaxWrapper disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              delay="delay-0ms"
              className="init-invisible"
            >
              <h2 className="section-title" data-eyebrow="01 — What we do">Services</h2>
            </InViewAnimationTwo>
            <div className="services-container grid-container col-2 small-col-1">
              {children}
            </div>
            <p className="margin-top-20">
              <strong>Selected development experience</strong><br />
              At Centricity, Billy helped build and maintain more than 40 active client e-commerce stores and built custom APIs for credential validation and an international redemption program.
            </p>
            <a href="/portfolio">View design and development work</a>
          </ParallaxWrapper>
        </div>
      </div>
    </section>
  );
}
