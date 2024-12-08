import Homesplash from '../components/home/homesplash';
import FullStack from '../components/home/full-stack-design';
import TechStack from '../components/home/techstack';
import About from '../components/home/about';
import Services from '../components/home/Services';
import FetchServices from '../components/home/getServices';
//import ContactSection from "../components/home/contact-section";
import Companies from '../components/home/Companies';
import FetchCompanies from '../components/home/getCompanies';
import ParallaxProviderWrapper from '../components/utilities/ParallaxProviderWrapper';

// to do:

// IMPORTANT
// get animation delays working
// get specialty animation bars working
// update resume document
// rework metadata and seo
// refactor and simplify code
// add/remove featured portfolio content
// move sub domains to vercel

// NICE TO HAVE
// evaluate use of 3rd party image hosting
// get contact section form working
// add portfolio all page
// add 404 page
// add favicon
// add robots.txt
// add sitemap.xml
// add analytics
// add gtag
// add favicon
// add robots.txt
// add sitemap.xml

export default function Home() {
  return (
    <ParallaxProviderWrapper>
      <div id="home">
        <Homesplash />
        <FullStack />
        <TechStack />
        <Services children={<FetchServices />} />
        <Companies children={<FetchCompanies />} />
        <About />
        {/* <ContactSection /> */}
      </div>
    </ParallaxProviderWrapper>
  );
}
