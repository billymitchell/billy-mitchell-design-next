"use client"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js";
//import { Parallax } from "react-scroll-parallax"
import SeparatorTop from "../separator-top"
import SeparatorBottom from "../separator-bottom"

export default function Companies({ children }) {
  return (
    <>
      <SeparatorTop className="bg-blue" />
      <section id="companies" className="home-page-section bg-blue small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-1000">
            {/* <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}> */}
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              className="init-invisible" animation={undefined} duration={undefined} animationdelay={undefined} fillmode={undefined} easing={undefined} iteration={undefined} threshold={undefined}            >
              <h3 className="margin-top-0">Businesses I've Worked With</h3>
            </InViewAnimationTwo>
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              className="init-invisible"
              animationdelay="delay-250ms" animation={undefined} duration={undefined} fillmode={undefined} easing={undefined} iteration={undefined} threshold={undefined}            >
              <p>
                Direct employment, agency work, contract, and B2B services.
              </p>
            </InViewAnimationTwo>
            <InViewAnimationTwo
              rootMargin="-25% 0%"
              animationdelay="delay-500ms"
              className="init-invisible" animation={undefined} duration={undefined} fillmode={undefined} easing={undefined} iteration={undefined} threshold={undefined}            >
              <div className="bg-white padding-40 border-r-7 border-width-4 border-solid border-color-gray-1 small-padding-25" >
                {/* <AirtableFetch /> */}
                {children}
              </div>
            </InViewAnimationTwo>
            {/* </Parallax> */}
          </div>
        </div>
      </section>
      <SeparatorBottom className="bg-blue" />
    </>
  )
}