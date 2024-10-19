import GetCurrentDate from "../components/utilities/getcurrentdate"
import Link from 'next/link'

const Footer = () => {
    return (

        <footer className="bg-brand-dark-5">
            <div className="outer-container">
                <div className="inner-width">
                    <div className="primary-contact-info">
                        <p>
                            <i className="fas fa-paper-plane"></i><a href="mailto:hello@billymitchell.design">hello@billymitchell.design</a>
                            <br></br>
                            <i className="fas fa-phone-alt"></i><a href="tell:4437658265">4437658265</a><br></br>
                            <i className="fas fa-file-alt"></i><Link href="/Billy-Mitchell-Resume-2022.pdf">Resume</Link>
                        </p>
                    </div>
                    <div className="external-social-links">

                        <a target="_blank" href="https://twitter.com/designbilly" rel="noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/in/billymitchelldesign/"
                            rel="noreferrer"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        <a target="_blank" href="https://github.com/billymitchell" rel="noreferrer">

                            <i className="fab fa-github"></i>
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
