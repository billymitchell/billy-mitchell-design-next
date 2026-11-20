import Homesplash from '../components/home/homesplash';
import FullStack from '../components/home/full-stack-design';
import Tools from '../components/home/tools';
import About from '../components/home/about';
import Services from '../components/home/Services';
import FetchServices from '../components/home/getServices';
//import ContactSection from "../components/home/contact-section";
import Companies from '../components/home/Companies';
import Testimonials from '../components/home/Testimonials';
import FetchCompanies from '../components/home/getCompanies';
import ParallaxProviderWrapper from '../components/utilities/ParallaxProviderWrapper';
// app/page.js
import Header from '../components/header';
import { jsonLd, LEGAL_NAME, OG_IMAGE, SITE_NAME, SITE_URL } from './seo';
import { GOOGLE_BUSINESS_URL, LINKEDIN_COMPANY_URL } from '../components/utilities/siteLinks';


const title = 'Design & Development Agency | Billy Mitchell Design';
const description = 'Baltimore design and development agency building websites, e-commerce stores, custom web applications, and workflow automations, alongside brand identity design.';

export async function generateMetadata() {
  return {
    title,
    description,
    authors: [
      { name: 'Billy Mitchell', url: 'https://billymitchell.design' },
    ],
    alternates: {
      canonical: `${SITE_URL}/`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/`,
      siteName: SITE_NAME,
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
      title,
      description,
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

const BUSINESS_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#billy-mitchell`;

const services = [
  {
    name: 'Web Design & E-commerce',
    description: 'Responsive websites and e-commerce storefronts on Shopify, BigCommerce, and specialized platforms like OrderMyGear (OMG), including custom themes and storefront features.',
  },
  {
    name: 'Applications & Internal Tools',
    description: 'Custom web applications and internal tools built around how a team works.',
  },
  {
    name: 'Automation & API Integrations',
    description: 'Custom APIs, microservices, and workflow automation that connect the tools a business already uses.',
  },
  {
    name: 'Brand Identity',
    description: 'Logos, color palettes, and typography that work across websites, storefronts, and marketing materials.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      publisher: { '@id': BUSINESS_ID },
    },
    {
      '@type': 'ProfessionalService',
      '@id': BUSINESS_ID,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      alternateName: 'Billy Mitchell Design & Development',
      description,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}${OG_IMAGE}`,
      email: 'hello@billymitchell.design',
      telephone: '+1-443-765-8265',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baltimore',
        addressRegion: 'MD',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Baltimore', containedInPlace: { '@type': 'State', name: 'Maryland' } },
        { '@type': 'State', name: 'Maryland' },
        { '@type': 'Country', name: 'United States' },
      ],
      founder: { '@id': PERSON_ID },
      knowsAbout: [
        'Brand identity design',
        'Web design',
        'Shopify',
        'BigCommerce',
        'WooCommerce',
        'OrderMyGear (OMG)',
        'E-commerce development',
        'Custom web applications',
        'API integrations',
        'Workflow automation',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Design and development services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', ...service, provider: { '@id': BUSINESS_ID } },
        })),
      },
      // Profiles that belong to the business itself (personal profiles live on the Person below)
      sameAs: [GOOGLE_BUSINESS_URL, LINKEDIN_COMPANY_URL].filter(Boolean),
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Billy Mitchell',
      url: `${SITE_URL}/`,
      jobTitle: 'Creative Director and Technical Lead',
      image:
        'https://res.cloudinary.com/billymitchell/image/upload/f_auto,q_auto,c_limit,w_800/home/PhotoByMicahEWood-156-web.jpg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baltimore',
        addressRegion: 'MD',
        addressCountry: 'US',
      },
      alumniOf: 'University of Maryland, Baltimore County',
      worksFor: { '@id': BUSINESS_ID },
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
        <Homesplash />
        <Services><FetchServices /></Services>
        <FullStack />
        <Tools />
        <Companies><FetchCompanies /></Companies>
        <Testimonials />
        <About />
        {/* <ContactSection /> */}
      </div>
    </ParallaxProviderWrapper>
    </>
  );
}
