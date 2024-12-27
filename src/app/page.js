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
// app/page.js


export async function generateMetadata() {
  return {
    title: 'Billy Mitchell Design & Development',
    description: 'Creative web design, development, and digital solutions by Billy Mitchell. Specializing in front-end development, e-commerce, and graphic design.',
    keywords: ['Billy Mitchell', 'Web Design', 'Web Development', 'E-commerce', 'Front-end Development', 'Graphic Design', 'Next.js'],
    authors: [
      { name: 'Billy Mitchell', url: 'https://billymitchell.design' },
    ],
    openGraph: {
      title: 'Billy Mitchell Design & Development',
      description: 'Explore creative web design and development solutions by Billy Mitchell. Specializing in front-end development, e-commerce platforms, and more.',
      url: 'https://billymitchell.design',
      siteName: 'Billy Mitchell Design & Development',
      images: [
        {
          url: '/files/open-graph.png', // Replace with your actual Open Graph image URL
          width: 1200,
          height: 630,
          alt: 'Billy Mitchell Design & Development Open Graph Image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Billy Mitchell Design & Development',
      description: 'Creative web design, development, and digital solutions by Billy Mitchell.',
      images: ['/files/open-graph.png'], // Replace with your actual Twitter card image URL
    },
    icons: {
      icon: '/files/favicon.ico', // Path to your favicon
    },
  };
}

// to do:

// IMPORTANT
// move primary domain to vercel
// move sub domains to vercel
// update dns records
// add/remove featured portfolio content
// add/remove featured tech stack content
// add/remove featured services content
// add/remove featured companies content
// add/remove featured about content
// add/remove featured contact content
// review each project 
// refactor and simplify code

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
