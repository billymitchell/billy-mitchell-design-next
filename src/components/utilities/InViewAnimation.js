'use client'
import React from "react"
// Intersection Observer 
import { InView } from "react-intersection-observer"

const Defaults = {
  animation: "fade-in-up",
  duration: "time-1000ms",
  delay: "delay-0ms",
  fillmode: "forwards",
  easing: "ease-in-out-quad",
  iteration: "loop-1",
}

const InViewAnimation = ({
  // Props
  // 6 Animation Attributes
  animation,
  duration,
  delay,
  fillmode,
  easing,
  iteration,
  // class
  className,
  // percent visible before event triggers
  threshold,
  // Contents within
  children,

}) => {
  return (
    // react-intersection-observer component 
    <InView
      // On change 
      onChange={(inView, entry) => {
        // When in view
        if (entry.isIntersecting === true) {
          // if custom animation values are passed 
          if (entry.target.attributes["animation"] !== undefined) {
            // add them to the class 
            entry.target.classList.add(entry.target.attributes["animation"].value)
          } else {
            // use default values
            entry.target.classList.add(Defaults["animation"])
          }
          if (entry.target.attributes["duration"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["duration"].value)
          } else {
            entry.target.classList.add(Defaults["duration"])
          }
          if (entry.target.attributes["delay"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["delay"].value)
          } else {
            entry.target.classList.add(Defaults["delay"])
          }
          if (entry.target.attributes["fillmode"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["fillmode"].value)
          } else {
            entry.target.classList.add(Defaults["fillmode"])
          }
          if (entry.target.attributes["easing"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["easing"].value)
          } else {
            entry.target.classList.add(Defaults["easing"])
          }
          if (entry.target.attributes["iteration"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["iteration"].value)
          } else {
            entry.target.classList.add(Defaults["iteration"])
          }
          if (entry.target.attributes["iteration"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["iteration"].value)
          } else {
            entry.target.classList.add(Defaults["iteration"])
          }
        }
      }}
    >
      {({ inView, ref, entry }) => (
        // Return Div with each prop on the appropriate attribute
        <div
          animation={animation}
          duration={duration}
          delay={delay}
          fillmode={fillmode}
          easing={easing}
          iteration={iteration}
          className={className}
          ref={ref}
        >
          {/* Return Any Child Elements */}
          {children}
        </div>
      )}
    </InView >
  )
}

export default InViewAnimation
