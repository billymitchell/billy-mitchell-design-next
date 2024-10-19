import React, { useEffect } from 'react';
// Intersection Observer 
import { useInView } from "react-intersection-observer"

const Defaults = {
  animation: "fade-in-up",
  duration: "time-1000ms",
  // "delay" is InView prop
  animationdelay: "animation-delay-0ms",
  fillmode: "forwards",
  easing: "ease-in-out-quad",
  iteration: "loop-1",
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
  const [ref, inView, entry] = useInView({
    triggerOnce: true,
    rootMargin: "-500px",
  });
  useEffect(() => {
    if (inView) {
      console.log(entry.target.attributes);
      // if (entry.target.attributes["animation"] !== undefined) {
      //   // add them to the class 
      //   entry.target.classList.add(entry.target.attributes["animation"].value)
      // } else {
      //   // use default values
      //   entry.target.classList.add(Defaults["animation"])
      // }
      // if (entry.target.attributes["duration"] !== undefined) {
      //   entry.target.classList.add(entry.target.attributes["duration"].value)
      // } else {
      //   entry.target.classList.add(Defaults["duration"])
      // }
      // if (entry.target.attributes["animationdelay"] !== undefined) {
      //   entry.target.classList.add(entry.target.attributes["animationdelay"].value)
      // } else {
      //   entry.target.classList.add(Defaults["animationdelay"])
      // }
      // if (entry.target.attributes["fillmode"] !== undefined) {
      //   entry.target.classList.add(entry.target.attributes["fillmode"].value)
      // } else {
      //   entry.target.classList.add(Defaults["fillmode"])
      // }
      // if (entry.target.attributes["easing"] !== undefined) {
      //   entry.target.classList.add(entry.target.attributes["easing"].value)
      // } else {
      //   entry.target.classList.add(Defaults["easing"])
      // }
      // if (entry.target.attributes["iteration"] !== undefined) {
      //   entry.target.classList.add(entry.target.attributes["iteration"].value)
      // } else {
      //   entry.target.classList.add(Defaults["iteration"])
      // }
    }
  }, [inView]);
  return (
    <div
      ref={ref}
      // Animation Props
      className={className}
      animation={animation}
      duration={duration}
      animationdelay={animationdelay}
      fillmode={fillmode}
      easing={easing}
      iteration={iteration}
    >
      {children}
    </div>
  )
}

export default InViewAnimation
