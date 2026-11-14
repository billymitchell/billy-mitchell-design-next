// src/app/portfolio/[project_title]/page.js
import { notFound, permanentRedirect } from 'next/navigation';
import companiesData from '../../../components/utilities/data/companiesData.json';
import cloudinaryData from '../../../components/utilities/data/cloudinaryData.json';
import Header from '../../../components/header';
import { cleanURL } from '../../../components/utilities/cleanURL';
import GalleryLightbox from '../../../components/GalleryLightbox';
import {
  findProjectBySlug,
  getFeaturedImageDimensions,
  publishedProjects,
  toPlainText,
} from '../../../components/utilities/projects';
import {
  isVideoFile,
  portfolioImageSrcSet,
  portfolioImageUrl,
  portfolioOgImageUrl,
} from '../../../components/utilities/cloudinary';
import { getProjectSlug, jsonLd, OG_IMAGE, SITE_URL } from '../../seo';

const HEADER_IMAGE_WIDTHS = [640, 960, 1280, 1920, 2400];

const joinList = (value) => (Array.isArray(value) ? value.join(', ') : '');

const getDescription = (data) => {
  const intro = toPlainText(data['Intro Text']);
  if (intro.length >= 50) return intro;

  return `Explore the details of ${data['Project Title']}, a ${joinList(
    data['Job Type']
  )} project led by Billy Mitchell. Focused on ${joinList(
    data['Creative Discipline']
  )}, built using ${joinList(data['Made With'])}.`;
};

const getShareImage = (data) => {
  const featured = data['Featured Image URL'];
  return !featured || isVideoFile(featured)
    ? `${SITE_URL}${OG_IMAGE}` // Fallback image for videos / missing images
    : portfolioOgImageUrl(featured);
};

// Generate metadata dynamically and pass project data
export async function generateMetadata({ params }) {
  const match = findProjectBySlug(params.project_title);

  if (!match) {
    return {
      title: 'Project Not Found - Billy Mitchell Portfolio',
      description: 'The requested project could not be found.',
      robots: { index: false },
    };
  }

  const data = match.project.fields;
  const url = `${SITE_URL}/portfolio/${match.slug}`;
  const title = `${String(data['Project Title']).trim()} - Billy Mitchell Portfolio`;
  const description = getDescription(data);
  const image = getShareImage(data);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Billy Mitchell Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${data['Project Title']} featured image`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// Function to generate static paths for all projects
export async function generateStaticParams() {
  return publishedProjects.map((project) => ({
    project_title: getProjectSlug(project.fields['Project Title']),
  }));
}

const IfLiveURL = (data) => {
  if (data['Live Web Project URL']) {
    return (
      <>
        <span>
          <b>Live Project URL:</b>{' '}
        </span>
        <a target="_blank" rel="noreferrer" href={data['Live Web Project URL']}>
          {cleanURL(data['Live Web Project URL'])}
        </a>
        <br />
      </>
    );
  }
  return null;
};

const IfGitHubURL = (data) => {
  const url = data['GitHub URL'];
  const url2 = data['2nd Github URL'];
  if (!url && !url2) return null;

  return (
    <>
      <span>
        <b>GitHub Code Repository: </b>
      </span>
      {url && (
        <a target="_blank" rel="noreferrer" href={url}>
          {cleanURL(url)}
        </a>
      )}
      {url && url2 && <span> | </span>}
      {url2 && (
        <a target="_blank" rel="noreferrer" href={url2}>
          {cleanURL(url2)}
        </a>
      )}
      <br />
    </>
  );
};

const IfPosition = (data) => {
  if (data['Position on Project']) {
    return (
      <>
        <span>
          <b>Position:</b>{' '}
        </span>
        <span>{joinList(data['Position on Project']) || String(data['Position on Project'])}</span>
        <br />
      </>
    );
  }
  return null;
};

// Cloudinary media sources for videos
const getCloudinaryMediaSources = (filename) => {
  if (!filename) return [];
  const basePath = 'https://res.cloudinary.com/billymitchell/video/upload/portfolio/';
  const name = filename.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '');
  return [
    { src: `${basePath}${name}.webm`, type: 'video/webm' },
    { src: `${basePath}${name}.mp4`, type: 'video/mp4' },
  ];
};

// Low-res Cloudinary video sources (blurred page header)
const getCloudinaryLowResVideoSources = (filename) => {
  if (!filename) return [];
  const basePath = 'https://res.cloudinary.com/billymitchell/video/upload/w_600,q_40/portfolio/';
  const name = filename.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '');
  return [
    { src: `${basePath}${name}.webm`, type: 'video/webm' },
    { src: `${basePath}${name}.mp4`, type: 'video/mp4' },
  ];
};

// Only ship the handful of fields the gallery needs to the browser
const getGalleryAssets = (folder) =>
  (cloudinaryData[folder] || []).map(
    ({ asset_id, public_id, format, resource_type, secure_url, width, height, bytes }) => ({
      asset_id, public_id, format, resource_type, secure_url, width, height, bytes,
    })
  );

const renderHeader = (data, dimensions) => {
  const featured = data['Featured Image URL'];

  if (data['Custom HTML']) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data['Custom HTML'],
        }}
      ></div>
    );
  }
  if (data['Hide Featured Image In Body'] === true || !featured) {
    return null;
  }
  if (isVideoFile(featured)) {
    return (
      <video className="fetched-header" controls playsInline preload="metadata">
        {getCloudinaryMediaSources(featured).map((source) => (
          <source key={source.type} src={source.src} type={source.type} />
        ))}
        Your browser does not support the video tag.
      </video>
    );
  }
  return (
    <img
      className="fetched-header"
      src={portfolioImageUrl(featured, 1280)}
      srcSet={portfolioImageSrcSet(featured, HEADER_IMAGE_WIDTHS)}
      sizes="(min-width: 1230px) 1200px, calc(100vw - 30px)"
      alt={String(data['Project Title']).trim()}
      width={dimensions?.width}
      height={dimensions?.height}
      decoding="async"
    />
  );
};

const renderHtmlField = (html) =>
  html ? <div dangerouslySetInnerHTML={{ __html: html }}></div> : null;

// Server Component to render the project page
export default function PortfolioContent({ params }) {
  const match = findProjectBySlug(params.project_title);

  // Unknown project: real 404 instead of a 200 "not found" page
  if (!match) notFound();

  // Old URL format: send visitors and search engines to the canonical URL
  if (match.isLegacy) permanentRedirect(`/portfolio/${match.slug}`);

  const data = match.project.fields;
  const title = String(data['Project Title']).trim();
  const featured = data['Featured Image URL'];
  const dimensions = getFeaturedImageDimensions(data);

  // Company names for the "Made For" field (skip any we have no record for)
  const companyNames = Array.isArray(data['Made For'])
    ? data['Made For']
        .map(
          (companyId) =>
            companiesData.find((item) => item.id === companyId)?.fields[
              'Company Name'
            ]
        )
        .filter(Boolean)
    : [];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    url: `${SITE_URL}/portfolio/${match.slug}`,
    description: getDescription(data),
    image: getShareImage(data),
    ...(data['End Date'] ? { dateCreated: data['End Date'] } : {}),
    ...(data['Date Modified'] ? { dateModified: data['Date Modified'] } : {}),
    genre: data['Creative Discipline'],
    keywords: joinList(data['Made With']),
    creator: {
      '@type': 'Person',
      name: 'Billy Mitchell',
      url: SITE_URL,
    },
  };

  return (
    <div id="portfolio-page" className="bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <Header />
      <div className="portfolio-header-container">
        <div className="image-container">
          {isVideoFile(featured) ? (
            <video
              className="portfolio-header"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              aria-hidden="true"
            >
              {getCloudinaryLowResVideoSources(featured).map((source) => (
                <source key={source.type} src={source.src} type={source.type} />
              ))}
            </video>
          ) : featured ? (
            // Decorative, blurred backdrop: a small image is plenty
            <img
              className="portfolio-header"
              src={portfolioImageUrl(featured, 800)}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
            />
          ) : null}
        </div>
        <h1>{title}</h1>
      </div>
      <div className="outer-container-body">
        <div className="inner-text-width">
          <div className="portfolio-meta-data">
            <p>
              <span>
                <b>End Date:</b> {data['End Date'] ? String(data['End Date']) : 'Ongoing'}
              </span>
              <br />
              {IfLiveURL(data)}
              {IfGitHubURL(data)}
              <span>
                <b>Creative Discipline:</b>{' '}
                {Array.isArray(data['Creative Discipline']) &&
                  data['Creative Discipline'].map((discipline, index) => (
                    <span key={index}>
                      {index > 0 && ' | '}
                      {discipline}
                    </span>
                ))}
              </span>
              <br />
              <span>
                <b>Job Type:</b> {joinList(data['Job Type'])}
              </span>
              <br />
              {companyNames.length > 0 && (
                <>
                  <span>
                    <b>Made for:</b>{' '}
                    {companyNames.map((name, index) => (
                      <span key={index} className="Company">
                        {index > 0 && ' | '}
                        {name}
                      </span>
                    ))}
                  </span>
                  <br />
                </>
              )}
              {IfPosition(data)}
              <span>
                <b>Made With:</b>{' '}
                {Array.isArray(data['Made With']) &&
                  data['Made With'].map((tech, index) => (
                    <span key={index} className="Company">
                      {index > 0 && ' | '}
                      {tech}
                    </span>
                  ))}
              </span>
              <br />
            </p>
          </div>
          <div className="intro-text">{renderHtmlField(data['Intro Text'])}</div>
        </div>
        <div className="inner-width">{renderHeader(data, dimensions)}</div>
        <div className="inner-text-width imported-text">
          {renderHtmlField(data['Body Text'])}
        </div>
        <div className="inner-width gallery-section">
          {data['Gallery Folder Name'] && (
            <GalleryLightbox
              title={title}
              assets={getGalleryAssets(data['Gallery Folder Name'])}
            />
          )}
        </div>
      </div>
    </div>
  );
}
