'use client';
import InViewAnimationTwo from "../utilities/InViewAnimationTwo.js"

const Homesplash = () => {
  return (
    <div className="video-wrapper-home">
      <video
        className="homepage-video-file"
        crossOrigin="anonymous"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        id="homepage-video-file"
      >
        <source
          src="https://res.cloudinary.com/billymitchell/video/upload/f_auto,vc_auto/home/Billy-Mitchell-Design-Home-Video_zgl0dp"
        ></source>
      </video>
      <lottie-player
        src="https://assets4.lottiefiles.com/private_files/lf30_xRpJ98.json"
        background="transparent"
        speed="1"
        autoplay
      ></lottie-player>
      <div className="overlay-content">
        <div className="outer-container">
          <div className="inner-width">
            <InViewAnimationTwo
              className="init-invisible"
            >
              <h1 className="text-center">Billy Mitchell</h1>
            </InViewAnimationTwo>
            <InViewAnimationTwo
              animationdelay="delay-250ms"
              className="init-invisible"
            >
              <h2 className="text-center">UI/UX Designer<br />Frontend Developer</h2>
            </InViewAnimationTwo>
          </div>
        </div>
      </div>
      <div className="scroll-down-overlay">
        <img
          alt="down arrow"
          className="scroll-down"
          src="https://res.cloudinary.com/billymitchell/image/upload/v1600977106/home/Scrolldown-white_b7xo4m.gif"
        ></img>
      </div>
    </div>
  )
}
export default Homesplash
