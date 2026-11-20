"use client"
import SectionTransition from "./SectionTransition";
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js";
//import { Parallax } from "react-scroll-parallax"

export default function Companies({ children }) {
  return (
    <>
      <SectionTransition index={3} from="tools" to="experience" />
      <section id="companies" className="home-page-section bg-ink-2 small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-1000">
            {/* <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}> */}
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              className="init-invisible" animation={undefined} duration={undefined} delay={undefined} fillmode={undefined} easing={undefined} iteration={undefined} threshold={undefined}            >
              <h2 className="section-title margin-top-0" data-eyebrow="04 — Clients">Selected Experience</h2>
            </InViewAnimationTwo>
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              className="init-invisible"
              delay="delay-250ms" animation={undefined} duration={undefined} fillmode={undefined} easing={undefined} iteration={undefined} threshold={undefined}            >
              <p>
                Organizations Billy has supported through employment, agency work, and direct client engagements.
              </p>
            </InViewAnimationTwo>
              <div className="bg-paper padding-40 border-r-7 small-padding-25" >
                {children}
              </div>
          </div>
        </div>
      </section>
    </>
  )
}