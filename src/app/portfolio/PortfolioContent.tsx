// src/app/portfolio/PortfolioContent.tsx

import React from 'react';
import ClientMasonry from "../../components/utilities/clientMasonry";
import InViewAnimationTwo from "../../components/utilities/InViewAnimationTwo";
import Link from 'next/link';
import { airtableData } from '@/components/utilities/getAirtableData';

const IfFeaturedImage = (portfolioItem: PortfolioItem) => {
  if (portfolioItem.fields["Featured Image URL"]) {
    return (
      <>
        <img
          className="fluid"
          id={portfolioItem.id}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good/portfolio/${portfolioItem.fields["Featured Image URL"]}`}
          alt={portfolioItem.fields["Project Title"]}
        />
        <p className="title">
          <strong>{portfolioItem.fields["Project Title"]}</strong>
        </p>
      </>
    );
  } else {
    return null;
  }
};

interface PortfolioItem {
  id: string;
  fields: {
    "Project Title": string;
    [key: string]: any; // To allow other fields
  };
}

interface PortfolioContentProps {
  selectedDiscipline?: string;
}

const PortfolioContent: React.FC<PortfolioContentProps> = ({ selectedDiscipline = "Featured" }) => {
  // Access projects data from airtableData
  const { projectsData } = airtableData;

  const handleLinkClick = (item: PortfolioItem) => {
    // Handle link click logic if needed
    console.log("Portfolio item clicked:", item);
  };

  const renderPortfolioContent = (selectedPortfolioContent: PortfolioItem[]) => {
    return selectedPortfolioContent.map((portfolioItem, index) => (
      <InViewAnimationTwo
        key={portfolioItem.id}
        animationdelay={`delay-${((index * 50) + 200)}ms`}
        className="init-invisible" animation={undefined} duration={undefined} fillmode={undefined} easing={undefined} iteration={undefined} rootMargin={undefined} threshold={undefined}      >
        <div id={portfolioItem.id} className="portfolio-item">
          <Link href={{
            pathname: `/portfolio/${portfolioItem.fields["Project Title"]
              .toLowerCase()
              .replace('&', 'and')
              .replace(/\s/gi, '-')
              .replace("/", "")
              .replace(" / ", "")
              }`
          }} onClick={() => handleLinkClick(portfolioItem)}>
            {IfFeaturedImage(portfolioItem)}
          </Link>
        </div>
      </InViewAnimationTwo >
    ));
  };

  // Filter projects based on selectedDiscipline
  const selectedPortfolioContent = (projectsData as unknown as PortfolioItem[]).filter((item: PortfolioItem) => {
    if (!item.fields.Published) return false;
    if (selectedDiscipline === "Featured") return item.fields.Featured;
    return item.fields["Creative Discipline"]?.includes(selectedDiscipline);
  });

  // Sort items by date
  const sortedPortfolioItems = selectedPortfolioContent.sort((a, b) => {
    const dateA = new Date(a.fields["End Date"]);
    const dateB = new Date(b.fields["End Date"]);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order
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
          {renderPortfolioContent(sortedPortfolioItems)}
        </ClientMasonry>
      )}
    </div>
  );
};

export default PortfolioContent;