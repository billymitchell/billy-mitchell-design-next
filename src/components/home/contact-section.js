import React, { useEffect, useState } from "react"
import ContactFrom from "../home/contact-form"
// import Parallax from "../../components/utilities/Parallax"
import { Parallax } from "react-scroll-parallax"
import SeparatorTop from "../../components/separator-top"
// import SeparatorBottom from "../../components/separator-bottom"

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
      <SeparatorTop className="bg-black" />
      <section id="contact" className="home-page-section small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-600">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <h3>Contact</h3>
              <p>
                Please contact me and I'll get back to you as soon as I can.
            </p>
              <ContactFrom />
            </Parallax>
          </div>
        </div>
      </section>
    </>
  )
}

export default FullStack
