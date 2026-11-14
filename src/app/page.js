import Homesplash from '../components/home/homesplash';
import FullStack from '../components/home/full-stack-design';
import Tools from '../components/home/tools';
import About from '../components/home/about';
import Services from '../components/home/Services';
import FetchServices from '../components/home/getServices';
//import ContactSection from "../components/home/contact-section";
import Companies from '../components/home/Companies';
import FetchCompanies from '../components/home/getCompanies';
import ParallaxProviderWrapper from '../components/utilities/ParallaxProviderWrapper';
// app/page.js
import Header from '../components/header';
import { jsonLd, SITE_URL } from './seo';


export async function generateMetadata() {
  return {
    title: 'Billy Mitchell Design & Development',
    description: 'Creative web design, development, and digital solutions by Billy Mitchell. Specializing in front-end development, e-commerce, and graphic design.',
    keywords: ['Billy Mitchell', 'Web Design', 'Web Development', 'E-commerce', 'Front-end Development', 'Graphic Design', 'Next.js'],
    authors: [
      { name: 'Billy Mitchell', url: 'https://billymitchell.design' },
    ],
    alternates: {
      canonical: `${SITE_URL}/`,
    },
    openGraph: {
      title: 'Billy Mitchell Design & Development',
      description: 'Explore creative web design and development solutions by Billy Mitchell. Specializing in front-end development, e-commerce platforms, and more.',
      url: `${SITE_URL}/`,
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

// Updates to content
  // consider switching images to local files / links vs cloudinary

//Update Home Page
  // create new homesplash video and fallback animation
  // Order Companies by priority
  // Link Companies to a project
  // Sort services by priority
  // Link services to a project

// Update Portfolio Content
  // Add flyers to portfolio
  // Add new projects
    // forbes travel guide API 
    // ASE API integration
    // Shipping API integration
    // Orderdesk rule setups
    // forms to monday.com jobs
  // Update existing projects
    // itravel better - add XD images
    // travel authority - add XD images
  // remove excessive examples
  // add code base link for projects to project header 
  // update made for from unknown to educational corse w/link
  // Portfolio Sort
    // default by featured and then by date
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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Billy Mitchell Design & Development',
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#billy-mitchell`,
      name: 'Billy Mitchell',
      url: `${SITE_URL}/`,
      jobTitle: 'Multidisciplinary Designer',
      image:
        'https://res.cloudinary.com/billymitchell/image/upload/f_auto,q_auto,c_limit,w_800/home/PhotoByMicahEWood-156-web.jpg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baltimore',
        addressRegion: 'MD',
        addressCountry: 'US',
      },
      alumniOf: 'University of Maryland, Baltimore County',
      worksFor: { '@type': 'Organization', name: 'Billy Mitchell Design LLC' },
      sameAs: [
        'https://www.linkedin.com/in/billymitchelldesign/',
        'https://github.com/billymitchell',
        'https://twitter.com/designbilly',
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
    />
    <Header page={"home"}/>
    <ParallaxProviderWrapper>
      <div id="home">
        {/* Order must match the from/to pairs on each SectionTransition */}
        <Homesplash />
        <Services>
          <FetchServices />
        </Services>
        <FullStack />
        <Tools />
        <Companies>
          <FetchCompanies />
        </Companies>
        <About />
        {/* <ContactSection /> */}
      </div>
    </ParallaxProviderWrapper>
    </>
  );
}
