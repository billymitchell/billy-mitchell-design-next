"use client";
import React from "react";
// Intersection Observer
import { InView } from "react-intersection-observer";

const Defaults = {
  animation: "fade-in-up",
  duration: "time-1000ms",
  animationdelay: "delay-0ms",
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
  animation,
  duration,
  animationdelay,
  fillmode,
  easing,
  iteration,
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
          const anim = target.getAttribute("animation") || Defaults.animation;
          const dur = target.getAttribute("duration") || Defaults.duration;
          const animDelay = target.getAttribute("animationdelay") || Defaults.animationdelay;
          const fill = target.getAttribute("fillmode") || Defaults.fillmode;
          const ease = target.getAttribute("easing") || Defaults.easing;
          const iter = target.getAttribute("iteration") || Defaults.iteration;

          addClasses(target, anim);
          addClasses(target, dur);
          addClasses(target, animDelay);
          addClasses(target, fill);
          addClasses(target, ease);
          addClasses(target, iter);
        }
      }}
    >
      {children}
    </InView>
  );
};

export default InViewAnimation;
