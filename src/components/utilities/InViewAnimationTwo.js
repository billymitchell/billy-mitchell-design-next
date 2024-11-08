'use client'
import React from "react"
// Intersection Observer 
import { InView } from "react-intersection-observer"

const Defaults = {
  animation: "fade-in-up",
  duration: "time-1000ms",
  // "delay" is InView prop
  animationdelay: "delay-0ms",
  fillmode: "forwards",
  easing: "ease-in-out-quad",
  iteration: "loop-1",
}

// Helper function to add multiple classes
function addClasses(element, classes) {
  classes.split(' ').forEach(cls => {
    element.classList.add(cls);
  });
}

const InViewAnimation = ({
  className,
  // 6 Animation Attributes
  animation,
  duration,
  // "delay" is InView prop
  animationdelay,
  fillmode,
  easing,
  iteration,
  // InView Props
  rootMargin,
  threshold,
  // Contents
  children,

}) => {
  return (
    // react-intersection-observer component 
    <InView
      as="div"
      // Animation Props
      className={className}
      animation={animation}
      duration={duration}
      animationdelay={animationdelay}
      fillmode={fillmode}
      easing={easing}
      iteration={iteration}
      // inView Props
      rootMargin={rootMargin}
      threshold={threshold}
      // track change
      onChange={(inView, entry) => {
        // When in view
        if (inView === true) {
          // if animation value
          if (entry.target.attributes["animation"] !== undefined) {
            addClasses(entry.target, entry.target.attributes["animation"].value);
          } else {
            addClasses(entry.target, Defaults["animation"]);
          }
          if (entry.target.attributes["duration"] !== undefined) {
            addClasses(entry.target, entry.target.attributes["duration"].value);
          } else {
            addClasses(entry.target, Defaults["duration"]);
          }
          if (entry.target.attributes["animationdelay"] !== undefined) {
            addClasses(entry.target, entry.target.attributes["animationdelay"].value);
          } else {
            addClasses(entry.target, Defaults["animationdelay"]);
          }
          if (entry.target.attributes["fillmode"] !== undefined) {
            addClasses(entry.target, entry.target.attributes["fillmode"].value);
          } else {
            addClasses(entry.target, Defaults["fillmode"]);
          }
          if (entry.target.attributes["easing"] !== undefined) {
            addClasses(entry.target, entry.target.attributes["easing"].value);
          } else {
            addClasses(entry.target, Defaults["easing"]);
          }
          if (entry.target.attributes["iteration"] !== undefined) {
            entry.target.classList.add(entry.target.attributes["iteration"].value)
          } else {
            entry.target.classList.add(Defaults["iteration"])
          }
        }
      }
      }
    >
      {children}
    </InView>
  )
}

export default InViewAnimation
