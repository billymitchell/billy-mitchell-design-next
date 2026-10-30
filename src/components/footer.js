import GetCurrentDate from "./utilities/getcurrentdate"
import Link from 'next/link'

const Icon = ({ children }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {children}
    </svg>
)

const Footer = () => {
    return (

        <footer className="bg-brand-dark-5">
            <div className="outer-container">
                <div className="inner-width">
                    <div className="primary-contact-info">
                        <p>
                        <Icon>
                            <path d="M22 2 11 13" />
                            <path d="m22 2-7 20-4-9-9-4Z" />
                        </Icon>
                        <a href="mailto:hello@billymitchell.design">hello@billymitchell.design</a>
                        <br></br>
                        <Icon>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.76 2.03Z" />
                        </Icon>
                        <a href="tell:4437658265">4437658265</a><br></br>
                        <Icon>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                            <path d="M14 2v6h6M8 13h8M8 17h8" />
                        </Icon>
                        <Link href="/files/Billy-Mitchell-Resume-Design-2026.pdf">Resume</Link>
                    </p>
                </div>
                <div className="external-social-links">

                    <a target="_blank" href="https://twitter.com/designbilly" rel="noreferrer" aria-label="Twitter">
                        <Icon>
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3Z" />
                        </Icon>
                    </a>
                    <a
                        target="_blank"
                        href="https://www.linkedin.com/in/billymitchelldesign/"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <Icon>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
                            <path d="M2 9h4v12H2zM4 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                        </Icon>
                    </a>

                    <a target="_blank" href="https://github.com/billymitchell" rel="noreferrer" aria-label="GitHub">
                        <Icon>
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </Icon>
                    </a>
                    </div>
                    <div className="footer-bottom">
                        <small>
                            Made with <span style={{ color: "red" }}>♥</span> on a rock in
                            space
                            <br />
                            Copyright © <GetCurrentDate /> Billy Mitchell Design LLC
                            <br />
                        </small>
                        <span className="block padding-5">
                            <small>
                                <a href="https://github.com/billymitchell/main-website">
                                    This website code is Open Source!
                                </a>
                            </small>
                        </span>
                    </div>
                </div>
            </div>
        </footer>

    )
}
export default Footer
