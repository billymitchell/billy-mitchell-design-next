import React from 'react';
import ClientMasonry from '../../components/utilities/clientMasonry';
import InViewAnimationTwo from '../../components/utilities/InViewAnimationTwo.js';
import Link from 'next/link';
import projectsData from '../../components/utilities/data/projectsData.json';

const IfFeaturedImage = (portfolioItem) => {
  if (portfolioItem.fields['Featured Image URL']) {
    return (
      <>
        <img
          className="fluid"
          id={portfolioItem.id}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good/portfolio/${portfolioItem.fields['Featured Image URL']}`}
          alt={portfolioItem.fields['Project Title'] || 'Untitled Project'}
        />
        <p className="title">
          <strong>
            {portfolioItem.fields['Project Title'] || 'Untitled Project'}
          </strong>
        </p>
      </>
    );
  } else {
    return null;
  }
};

const PortfolioContent = ({ selectedDiscipline = 'Featured' }) => {
  const generatePortfolioUrl = (title) => {
    return `/portfolio/${title
      .toLowerCase()
      .replace('&', 'and')
      .replace(/\s/gi, '-')
      .replace('/', '')
      .replace(' / ', '')}`;
  };

  const handleLinkClick = (item) => {
    console.log('Portfolio item clicked:', item);
  };

  const selectedPortfolioContent = projectsData.filter((item) => {
    if (!item.fields.Published) return false;
    if (selectedDiscipline === 'Featured') return item.fields.Featured;
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
                  {IfFeaturedImage(portfolioItem)}
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
