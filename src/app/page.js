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
