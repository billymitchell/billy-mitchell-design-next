'use client';
import SectionTransition from "./SectionTransition";
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js";
import { GOOGLE_REVIEW_URL } from "../utilities/siteLinks";

// Excerpts from LinkedIn recommendations ("…" marks omitted text; wording otherwise unchanged).

const testimonials = [
  {
    name: "Nick Noble",
    context: "Collaborator for 10+ years, across companies",
    href: "https://www.linkedin.com/in/nickisnoble/",
    quote: "Billy Mitchell is the real deal. He’s a multifaceted designer in the truest sense… You should hire him, because he is that type of multidisciplinary talent that most people consider “unicorns”.",
  },
  {
    name: "Adam Kemerer",
    context: "Director, Marketing Operations, Travel Leaders Network",
    href: "https://www.linkedin.com/in/adamkemerer/",
    quote: "Billy is a highly talented digital designer… Billy was able to turn around projects quickly and was eager to put new ideas into practice.",
  },
  {
    name: "Rob Moretti",
    context: "Senior Multimedia Designer & Video Producer",
    href: "https://www.linkedin.com/in/robmoretti/",
    quote: "Billy is dedicated in everything he does… I highly recommend Billy!",
  },
];

const Attribution = ({ name, context, href }) => (
  <figcaption className="testimonial__by">
    <span className="testimonial__name">{name}</span>
    <span className="testimonial__context">{context}</span>
    <a className="testimonial__source" href={href} target="_blank" rel="noopener noreferrer">
      LinkedIn<span aria-hidden="true"> ↗</span>
    </a>
  </figcaption>
);

export default function Testimonials() {
  return (
    <>
      <SectionTransition index={6} from="experience" to="testimonials" />
      <section id="testimonials" className="home-page-section bg-bone">
        <div className="outer-container">
          <div className="inner-width-1000">
            <InViewAnimationTwo rootMargin="-25% 0%" className="init-invisible">
              <h2 className="section-title" data-eyebrow="05 — Kind words">What collaborators say</h2>
            </InViewAnimationTwo>


            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <InViewAnimationTwo
                  key={t.name}
                  rootMargin="-25% 0%"
                  delay={`delay-${250 + i * 200}ms`}
                  className="init-invisible"
                >
                  <figure className="testimonial">
                    <blockquote><p>{t.quote}</p></blockquote>
                    <Attribution {...t} />
                  </figure>
                </InViewAnimationTwo>
              ))}
            </div>

            {GOOGLE_REVIEW_URL && (
              <div className="testimonials-more">
                <p className="testimonials-more__prompt">Worked with us? We’d love to hear how it went.</p>
                <a className="button" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                  Leave a Google review<span aria-hidden="true">↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
