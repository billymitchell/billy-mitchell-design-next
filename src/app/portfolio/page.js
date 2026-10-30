// app/portfolio/page.tsx (Server Component)

import Portfolio from '../portfolio/portfolio.js';
import projectsData from '../../components/utilities/data/projectsData.json';
import cloudinaryData from '../../components/utilities/data/cloudinaryData.json';
import { SITE_URL } from '../seo';

const cloudinaryAssets = new Map(
  Object.values(cloudinaryData)
    .flat()
    .map((asset) => [asset.public_id, asset])
);

const portfolioProjects = projectsData.map((project) => {
  const { fields } = project;
  const imageUrl = fields['Featured Image URL'];
  const imagePublicId = imageUrl
    ? `portfolio/${decodeURIComponent(imageUrl)}`
    : null;
  const imageAsset =
    (imagePublicId && cloudinaryAssets.get(imagePublicId)) ||
    (imagePublicId &&
      cloudinaryAssets.get(imagePublicId.replace(/\.[^.]+$/, '')));

  return {
    id: project.id,
    fields: {
      'Project Title': fields['Project Title'],
      Published: fields.Published,
      'Creative Discipline': fields['Creative Discipline'],
      'End Date': fields['End Date'],
      'Featured Image URL': imageUrl,
    },
    featuredImageDimensions: imageAsset
      ? { width: imageAsset.width, height: imageAsset.height }
      : null,
  };
});

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
    alternates: {
      canonical: `${SITE_URL}/portfolio`,
    },
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
  return <Portfolio projects={portfolioProjects} />;
}
