import React, { useEffect, useState } from 'react';
import ClientMasonry from '../../components/utilities/clientMasonry';
import InViewAnimationTwo from '../../components/utilities/InViewAnimationTwo.js';
import Link from 'next/link';
import projectsData from '../../components/utilities/data/projectsData.json';

const IfFeaturedMedia = ({ portfolioItem }) => {
  const [imageSize, setImageSize] = useState(null);
  const imageUrl = portfolioItem.fields['Featured Image URL'];
  const title = portfolioItem.fields['Project Title'] || 'Untitled Project';

  if (!imageUrl) return null;

  const isVideo = /\.(mp4|webm|mov|gif)$/i.test(imageUrl); // Include GIFs as videos

  useEffect(() => {
    if (!imageUrl || isVideo) return;

    const img = new Image();
    img.src = `https://res.cloudinary.com/billymitchell/image/upload/v1750459284/portfolio/${imageUrl}`;
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [imageUrl, isVideo]);

  if (isVideo) {
    const webmUrl = `https://res.cloudinary.com/billymitchell/video/upload/f_webm,q_auto:low/v1750459284/portfolio/${imageUrl}`;
    const mp4Url = `https://res.cloudinary.com/billymitchell/video/upload/f_mp4,q_auto:low/v1750459284/portfolio/${imageUrl}`;

    return (
      <>
        <video
          className="fluid"
          id={portfolioItem.id}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={webmUrl} type="video/webm" />
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="title">
          <strong>{title}</strong>
        </p>
      </>
    );
  }

  if (!imageSize) return null;

  const { width, height } = imageSize;
  const isTallerThan916 = height / width > 16 / 9;

  const transformedUrl = isTallerThan916
    ? `https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good,c_lfill,ar_9:16,g_auto/v1750459284/portfolio/${imageUrl}`
    : `https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good/v1750459284/portfolio/${imageUrl}`;

  return (
    <>
      <img className="fluid" id={portfolioItem.id} src={transformedUrl} alt={title} />
      <p className="title">
        <strong>{title}</strong>
      </p>
    </>
  );
};

const PortfolioContent = ({ selectedDiscipline }) => {
  const generatePortfolioUrl = (title) => {
    return `/portfolio/${title
      .toLowerCase()
      .replace('&', 'and')
      .replace('/', '')
      .replace(',', '')
      .replace(':', '')
      .replace(/\s/gi, '-')
      .trim()}`;
  };

  const handleLinkClick = (item) => {
    // Only log critical errors or important events
    if (!item || !item.id) {
      console.error('Portfolio item missing or invalid:', item);
    }
    // Remove other non-critical logs
  };

  const selectedPortfolioContent = projectsData.filter((item) => {
    if (selectedDiscipline === 'All') return item.fields.Published;
    return item.fields['Creative Discipline']?.includes(selectedDiscipline);
  });

  const sortedPortfolioItems = selectedPortfolioContent.sort((a, b) => {
    const dateA = new Date(a.fields['End Date'] || '1970-01-01');
    const dateB = new Date(b.fields['End Date'] || '1970-01-01');
    return dateB.getTime() - dateA.getTime();
  });

  const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="portfolio-item-container">
      {sortedPortfolioItems.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ClientMasonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {sortedPortfolioItems.map((portfolioItem, index) => (
            <InViewAnimationTwo
              key={portfolioItem.id}
              delay={`delay-${index * 50 + 200}ms`}
              className="init-invisible"
            >
              <div id={portfolioItem.id} className="portfolio-item">
                <Link
                  href={generatePortfolioUrl(
                    portfolioItem.fields['Project Title']
                  )}
                  onClick={() => handleLinkClick(portfolioItem)}
                >
                  <IfFeaturedMedia portfolioItem={portfolioItem} />
                </Link>
              </div>
            </InViewAnimationTwo>
          ))}
        </ClientMasonry>
      )}
    </div>
  );
};

export default PortfolioContent;
