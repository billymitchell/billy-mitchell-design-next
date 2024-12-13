// app/portfolio/page.tsx (Server Component)

import Portfolio from '../portfolio/portfolio.js';

export async function generateMetadata() {
  return {
    title: 'Billy Mitchell Portfolio - Design & Development',
    description: 'Explore the creative portfolio of Billy Mitchell, featuring work in Motion Design, UI Design, Web Development, UX Design, Branding, and Print Design.',
    keywords: [
      'Billy Mitchell',
      'Portfolio',
      'Motion Design',
      'UI Design',
      'Web Development',
      'UX Design',
      'Branding',
      'Print Design',
      'Graphic Design',
      'Creative Solutions',
    ],
    authors: [
      { name: 'Billy Mitchell', url: 'https://billymitchell.design' },
    ],
    openGraph: {
      title: 'Billy Mitchell Portfolio - Design & Development',
      description: 'Dive into the portfolio of Billy Mitchell, showcasing expertise in Motion Design, UI/UX Design, Web Development, Branding, and Print Design.',
      url: 'https://billymitchell.design/portfolio',
      siteName: 'Billy Mitchell Portfolio',
      images: [
        {
          url: '/files/open-graph.png', // Replace with actual image URL
          width: 1200,
          height: 630,
          alt: 'Billy Mitchell Portfolio Open Graph Image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Billy Mitchell Portfolio - Design & Development',
      description: 'A creative portfolio featuring Motion Design, UI Design, Web Development, UX Design, Branding, and Print Design by Billy Mitchell.',
      images: ['/files/open-graph.png'], // Replace with actual image URL
    },
    icons: {
      icon: '/files/favicon.ico', // Path to your favicon
    },
  };
}

export default function PortfolioPage() {
  return <Portfolio />;
}
