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
import Header from '../components/header';


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

//Update Home Page
  // create new homesplash video and fallback animation

// Update Portfolio Content
  // Add new projects
    // forbes travel guide API 
    // ASE API intigration
    // Shipping API intigrations
    // Orderdesk rule setups
    // forms to monday.com jobs
  // Update existing projects
    // itravel better - add XD images
    // travel authority - add XD images
  // remove excessive examples
  // add code base for projects to header 
  // update made for from unknown to educational corse w/link
  // create sort by priority
  // update filter links to sort by priority first
  // review each project and all links, where can I improve?

// Update tech stack content
  // MAC
  // + symbol
  // create hover text reveal

// add/remove featured services content
  // - order services by priority
  // - add consulting service
  // - expand width to 1000px

// add/remove featured companies content
  // - add centricity largest company logos 
  // - order companies by priority

// Update about content
  // update with AI
  // update image
  // move to top of page

// Add contact content
  // add form and submit functionality

// Refactor and simplify code
  // dynamically call Airtable data
  // add typescript support 
  // Cloudinary vs NextImg component
  // // add portfolio all page
  // style 404 page
  // add analytics

export default function Home() {
  return (
    <>
    <Header page={"home"}/>
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
    </>
  );
}

