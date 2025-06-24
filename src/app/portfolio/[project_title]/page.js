// src/app/portfolio/[project_title]/page.js
import projectsData from '../../../components/utilities/data/projectsData.json';
import companiesData from '../../../components/utilities/data/companiesData.json';
import cloudinaryData from '../../../components/utilities/data/cloudinaryData.json';
import { log } from 'node:console';
import Header from '../../../components/header';
import { cleanURL } from '../../../components/utilities/cleanURL';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import GalleryLightbox from '../../../components/GalleryLightbox';


// Generate metadata dynamically and pass project data
export async function generateMetadata({ params }) {

  function normalizeTitle(title) {
    return title.toLowerCase()
    .replace('&', 'and')
    .replace(/\s/gi, '-')
    .replace('/', '')
    .replace(' / ', '')
    .replace(':', '')
  }

  // Find the project
  const project = projectsData.find((item) =>
      normalizeTitle(item.fields['Project Title']) === params.project_title
  );

  if (!project) {
    return {
      title: 'Project Not Found - Billy Mitchell Portfolio',
      description: 'The requested project could not be found.',
    };
  }

  const data = project.fields;

  return {
    title: `${data['Project Title']} - Billy Mitchell Portfolio`,
    description: `Explore the details of ${data['Project Title']}, a ${data['Job Type'].join(
      ', '
    )} project led by Billy Mitchell. Focused on ${data['Creative Discipline'].join(
      ', '
    )}, built using ${data['Made With'].join(', ')}.`,
    openGraph: {
      title: `${data['Project Title']} - Billy Mitchell Portfolio`,
      description: `A showcase of ${data['Project Title']}, built using ${data['Made With'].join(
        ', '
      )}.`,
      url: data['Live Web Project URL'] || 'https://billymitchell.design',
      siteName: 'Billy Mitchell Portfolio',
      images: [
        {
          url: isVideoFile(data['Featured Image URL']) 
            ? 'https://billymitchell.design/files/open-graph.png' // Fallback image for videos
            : `https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/portfolio/${data['Featured Image URL']}`,
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
      title: `${data['Project Title']} - Billy Mitchell Portfolio`,
      description: `A creative project built with ${data['Made With'].join(
        ', '
      )}. Focused on ${data['Creative Discipline'].join(', ')}.`,
      images: [
        isVideoFile(data['Featured Image URL']) 
          ? 'https://billymitchell.design/files/open-graph.png' // Fallback image for videos
          : `https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/portfolio/${data['Featured Image URL']}`,
      ],
    },
    icons: {
      icon: '/files/favicon.ico', // Path to your favicon
    },
  };
}

// Function to generate static paths for all projects
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    project_title: String(project.fields['Project Title'])
      .toLowerCase()
      .replace(/[\s&/:]/g, '-'),
  }));
}

// Helper functions
const isVideoFile = (url) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
  return videoExtensions.some(ext => url.toLowerCase().includes(ext));
};

const IfLiveURL = (data) => {
  if (data['Live Web Project URL']) {
    return (
      <>
        <span>
          <b>Live Project URL:</b>{' '}
        </span>
        <a target="_blank" rel="noreferrer" href={data['Live Web Project URL']}>
          {cleanURL (data['Live Web Project URL'])}
        </a>
        <br />
      </>
    );
  }
  return null;
};

const IfGitHubURL = (data) => {
  let URL = data['GitHub URL'];
  let URL2 = data['2nd Github URL'];
  if (data['GitHub URL'] || data['2nd Github URL']) {
    return (
      <>
        <span>
          <b>GitHub Code Repository: </b>
        </span>

        <a target="_blank" rel="noreferrer" href={data['GitHub URL']}>
          {cleanURL (data['GitHub URL'])}
        </a>
        {data['2nd Github URL'] && (
          <>
          <span> | </span>
          <a href={data['2nd Github URL']}>
            {cleanURL (data['2nd Github URL'])}
          </a>
          </>
        )}
        <br />
      </>
    );
  }
  return null;
};

const IfPosition = (data) => {
  if (data['Position on Project']) {
    return (
      <>
        <span>
          <b>Position:</b>{' '}
        </span>
        <span>{data['Position on Project']}</span>
        <br />
      </>
    );
  }
  return null;
};

// Helper to get correct Cloudinary URL
const getCloudinaryMediaUrl = (filename) => {
  if (!filename) return '';
  const isVideo = isVideoFile(filename);
  const base = isVideo
    ? 'https://res.cloudinary.com/billymitchell/video/upload'
    : 'https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto';
  return `${base}/portfolio/${filename}`;
};

// New helper to get Cloudinary media sources for videos
const getCloudinaryMediaSources = (filename) => {
  if (!filename) return [];
  const basePath = 'https://res.cloudinary.com/billymitchell/video/upload/portfolio/';
  const name = filename.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '');
  return [
    { src: `${basePath}${name}.webm`, type: 'video/webm' },
    { src: `${basePath}${name}.mp4`, type: 'video/mp4' },
  ];
};

// Helper to get low-res Cloudinary video URL
const getCloudinaryLowResVideoSources = (filename) => {
  if (!filename) return [];
  const basePath = 'https://res.cloudinary.com/billymitchell/video/upload/w_600,q_40/portfolio/';
  const name = filename.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '');
  return [
    { src: `${basePath}${name}.webm`, type: 'video/webm' },
    { src: `${basePath}${name}.mp4`, type: 'video/mp4' },
  ];
};

// Update renderHeader
const renderHeader = (data) => {
  if (data['Custom HTML']) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data['Custom HTML'],
        }}
      ></div>
    );
  } else if (data['Hide Featured Image In Body'] === true) {
    return null;
  } else {
    if (isVideoFile(data['Featured Image URL'])) {
      const sources = getCloudinaryMediaSources(data['Featured Image URL']);
      return (
        <video
          className="fetched-header"
          controls
          // no autoplay, not muted, not looped
          playsInline
        >
          {sources.map((source) => (
            <source key={source.type} src={source.src} type={source.type} />
          ))}
          Your browser does not support the video tag.
        </video>
      );
    } else {
      const mediaUrl = getCloudinaryMediaUrl(data['Featured Image URL']);
      return (
        <img
          className="fetched-header"
          src={mediaUrl}
          alt={String(data['Project Title'])}
        />
      );
    }
  }
};

const ifCustomBodyHTML = (data) => {
  if (data['Body Text']) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data['Body Text'],
        }}
      ></div>
    );
  }
  return null;
};

const ifIntroText = (data) => {
  if (data['Intro Text']) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: data['Intro Text'],
        }}
      ></div>
    );
  }
  return null;
};



// Server Component to render the project page
export default function PortfolioContent({ params }) {

  function normalizeTitle(title) {
    return title
    .toLowerCase()
    .replace('&', 'and')
    .replace('/', '')
    .replace(',', '')
    .replace(':', '')
    .replace(/\s/gi, '-')
    .trim()
  }

  // Find the project
  const project = projectsData.find((item) =>
      normalizeTitle(item.fields['Project Title']) === params.project_title
  );

  if (!project) {
    return <p>Project not found.</p>;
  }

  const data = project.fields;
  
  // Find company names for the "Made For" field
  const companyNames = Array.isArray(data['Made For'])
    ? data['Made For'].map((companyId) => {
        const company = companiesData.find((item) => item.id === companyId);
        return company ? company.fields['Company Name'] : 'Unknown Company';
      })
    : [];

  return (
    <div id="portfolio-page" className="bg-black">
      <Header />
      <div className="portfolio-header-container">
        <div className="image-container">
          {isVideoFile(data['Featured Image URL']) ? (
            <video
              suppressHydrationWarning
              className="portfolio-header"
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              // no controls attribute
            >
              {getCloudinaryLowResVideoSources(data['Featured Image URL']).map((source) => (
                <source key={source.type} src={source.src} type={source.type} />
              ))}
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              suppressHydrationWarning
              className="portfolio-header"
              src={getCloudinaryMediaUrl(data['Featured Image URL'])}
              alt={String(data['Project Title'])}
            />
          )}
        </div>
        <h2>{String(data['Project Title'])}</h2>
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
                <b>Job Type:</b> {String(data['Job Type'])}
              </span>
              <br />
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
          <div className="intro-text">{ifIntroText(data)}</div>
        </div>
        <div className="inner-width">{renderHeader(data)}</div>
        <div className="inner-text-width imported-text">
          {ifCustomBodyHTML(data)}
        </div>
        <div className="inner-width gallery-section">
          {data['Gallery Folder Name'] && (
            <GalleryLightbox assets={cloudinaryData[data['Gallery Folder Name']] || []} />
          )}
        </div>
      </div>
    </div>
  );
}
