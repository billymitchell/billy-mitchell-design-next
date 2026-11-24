'use client';
import SectionTransition from "./SectionTransition";
import React from "react"
import useParallaxDisabled from "../utilities/useParallaxDisabled"
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"
import { Parallax } from "react-scroll-parallax"
import { Tilt } from 'react-tilt'
// https://github.com/jonathandion/react-tilt
// import Separator from "../../components/separator"


// Generic default-profile silhouette (viewBox shifted so it sits optically centered)
const PersonIcon = () => (
  <svg viewBox="0 1 24 24" aria-hidden="true">
    <circle cx="12" cy="9" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7Z" />
  </svg>
)

// Two generic people for contractors
const GroupIcon = () => (
  <svg viewBox="0 0.75 24 24" aria-hidden="true">
    <circle cx="16.5" cy="7.5" r="3" opacity=".55" />
    <path d="M14.2 13.4c.7-.2 1.5-.3 2.3-.3 3.4 0 5.5 2.2 5.5 5.6h-4.1c-.4-2.2-1.6-4-3.7-5.3Z" opacity=".55" />
    <circle cx="9" cy="9" r="3.6" />
    <path d="M2 21c0-4 3.1-6.4 7-6.4s7 2.4 7 6.4Z" />
  </svg>
)

// Generic AI-assistant sparkle
const SparkleIcon = () => (
  <svg viewBox="1.25 0 24 24" aria-hidden="true">
    <path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5Z" />
    <path d="M19 15.5c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3Z" />
  </svg>
)

// Coordinates are in the team graphic's 100 x 144 viewBox (portrait on top, team fanned below)
const PORTRAIT_CENTER = { x: 50, y: 46 }
const teamMembers = [
  { label: 'Personal Assistant', icon: <PersonIcon />, variant: 'person', x: 15, y: 110 },
  { label: 'AI Assistant', icon: <SparkleIcon />, variant: 'ai', x: 50, y: 118 },
  { label: 'Contractors', icon: <GroupIcon />, variant: 'person', x: 85, y: 110 },
]

// Curved line that leaves Billy's portrait and drops down to a teammate
const linkPath = ({ x, y }) => {
  const { x: cx, y: cy } = PORTRAIT_CENTER
  return `M${cx} ${cy} Q ${x} ${cy + (y - cy) * 0.3} ${x} ${y}`
}

const About = () => {
  // Set default state of parallax to enabled / not disabled
  const parallaxDisabledState = useParallaxDisabled();
  return (
    <>
      <SectionTransition index={4} from="testimonials" to="about" />
      <section id="about" className="home-page-section bg-stone mobile-height-fluid small-padding-top-50 small-padding-bottom-50 midsize-padding-bottom-100 midsize-padding-top-100">
        <div className="outer-container">
          <div className="inner-width-800">
            <Parallax disabled={parallaxDisabledState} y={[-30, 30]} x={[0, 0]}>
              <div className="container">
                <InViewAnimationTwo
                  rootMargin="-25% 0%"
                  className="init-invisible"
                >
                  <h2 className="section-title" data-eyebrow="06 — Who we are">About the Agency</h2>
                </InViewAnimationTwo>
                <div className="grid-container col-1-2 col-gap-30 small-col-1 about-layout">
                  <div className="align-self-center">

                    <InViewAnimationTwo

                      rootMargin="-25% 0%"
                      className="init-invisible"
                    >
                      <div className="about-team">
                        {/* Team: Billy connected to his assistant, contractors, and an AI assistant */}
                        <svg className="about-team__lines" viewBox="0 0 100 144" preserveAspectRatio="none" aria-hidden="true">
                          {teamMembers.map((m) => <path key={m.label} d={linkPath(m)} />)}
                        </svg>
                        <Tilt className="Tilt"
                          options={{
                            perspective: 1000,
                            scale: 1.1,
                            speed: 1000,
                            transition: true,
                            reset: true,
                            reverse: true,
                          }}
                        >
                          <img className="border-box fluid about-portrait clip-circular padding-6 border-r-full bg-gradient max-width-60vw center" src="/files/billy-mitchell-portrait.jpg" alt="Billy Mitchell outdoors" loading="lazy" decoding="async" />
                        </Tilt>
                        {teamMembers.map((m) => (
                          <div key={m.label} className="about-team__member" style={{ left: `${m.x}%`, top: `${(m.y / 144) * 100}%` }}>
                            <span className={`about-team__node about-team__node--${m.variant}`} aria-hidden="true">
                              {m.icon}
                            </span>
                            <span className="about-team__label">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    </InViewAnimationTwo>
                  </div>
                  <InViewAnimationTwo
                    rootMargin="-25% 0%"
                    delay="delay-250ms"
                    className="init-invisible"
                  >
                    <p>
                      Billy Mitchell Design is a design and development agency based in Baltimore. We help businesses plan, design, and build the brands, websites, and software they run on.
                    </p>
                    <p>
                      Our team designs brand identities and builds websites, e-commerce storefronts, and custom applications. We also connect the tools you already use through APIs and workflow automation, so your systems work together instead of creating extra work.
                    </p>
                    <p>
                      Every project is led by Billy Mitchell, our creative and technical lead. Because one person guides both the design and the build, from the first conversation through launch, nothing gets lost in the handoff. Billy’s background spans graphic design and full-stack development, including building and maintaining e-commerce stores and custom integrations at Centricity.
                    </p>
                    <p>
                      <a href="/files/Billy-Mitchell-Resume-Design-2026.pdf">View Billy Mitchell’s résumé</a>
                    </p>
                  </InViewAnimationTwo>
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section >
      <SectionTransition index={5} from="about" to="contact" />
    </>
  )
}

export default About
