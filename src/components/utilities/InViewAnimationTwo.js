"use client";
import React from "react";
// Intersection Observer
import { InView } from "react-intersection-observer";

const Defaults = {
  animation: "fade-in-up",
  duration: "time-1000ms",
  delay: "delay-0ms",
  fillmode: "forwards",
  easing: "ease-in-out-quad",
  iteration: "loop-1",
};

// Helper function to add multiple classes
function addClasses(element, classes) {
  classes.split(" ").forEach((cls) => {
    element.classList.add(cls);
  });
}

const InViewAnimation = ({
  className,
  animation = Defaults.animation,
  duration = Defaults.duration,
  delay = Defaults.delay,
  fillmode = Defaults.fillmode,
  easing = Defaults.easing,
  iteration = Defaults.iteration,
  rootMargin,
  threshold,
  children,
}) => {
  return (
    // react-intersection-observer component
    <InView
      as="div"
      className={className}
      rootMargin={rootMargin}
      threshold={threshold}
      // track change
      onChange={(inView, entry) => {
        if (inView === true) {
          const target = entry.target;

          addClasses(target, animation);
          addClasses(target, duration);
          addClasses(target, delay);
          addClasses(target, fillmode);
          addClasses(target, easing);
          addClasses(target, iteration);
        }
      }}
    >
      {children}
    </InView>
  );
};

export default InViewAnimation;
