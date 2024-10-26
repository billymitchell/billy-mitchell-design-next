
// import { ParallaxProvider } from "react-scroll-parallax"
//import dynamic from 'next/dynamic';
//const ParallaxProvider = dynamic(() => import('../components/utilities/ParallaxProvidor'), { ssr: false });
import ParallaxProviderWrapper from "../components/utilities/ParallaxProviderWrapper";

import Homesplash from "../components/home/homesplash"
import FullStack from "../components/home/full-stack-design"
import TechStack from "../components/home/techstack"
//import Companies from "../components/home/companies"
import About from "../components/home/about"
import Services from "../components/home/Services"
import FetchServices from "../components/home/getServices"
import ContactSection from "../components/home/contact-section"
import Companies from "../components/home/Companies";
import FetchCompanies from "@/components/home/getCompanies"



export default function Home() {
  return (

    <ParallaxProviderWrapper>
      <div id="home">
        <Homesplash />
        <FullStack />
        <TechStack />
        {/* <Companies /> */}
        <Services><FetchServices /></Services>
        <Companies><FetchCompanies /></Companies>
        <About />
        {/* <ContactSection /> */}
      </div>
    </ParallaxProviderWrapper>

  )
}
