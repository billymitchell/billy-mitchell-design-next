// src/app/portfolio/PortfolioContent.tsx

import React from 'react';
import ClientMasonry from "../../components/utilities/clientMasonry";
import InViewAnimationTwo from "../../components/utilities/InViewAnimationTwo";
import Link from 'next/link';
import { airtableData } from '@/components/utilities/getAirtableData'; // Import the Airtable data

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

const sortItemsByDate = (selectedPortfolioContent: PortfolioItem[]) => {
  return selectedPortfolioContent.sort((firstObject, secondObject) => {
    const dateA = firstObject.fields['End Date'] ? new Date(firstObject.fields['End Date']) : null;
    const dateB = secondObject.fields['End Date'] ? new Date(secondObject.fields['End Date']) : null;

    if (dateA === null && dateB !== null) return -1;
    if (dateA !== null && dateB === null) return 1;
    if (dateA !== null && dateB !== null) return dateB.getTime() - dateA.getTime();

    return 0;
  });
};

const IfFeaturedImage = (portfolioItem: PortfolioItem) => {
  if (portfolioItem.fields["Featured Image URL"]) {
    return (
      <>
        <img
          className="fluid"
          id={portfolioItem.id}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good/portfolio/${portfolioItem.fields["Featured Image URL"]}`}
          alt={portfolioItem.fields["Project Title"] || "Untitled Project"}
        />
        <p className="title">
          <strong>{portfolioItem.fields["Project Title"] || "Untitled Project"}</strong>
        </p>
      </>
    );
  } else {
    return (
      <p className="title-no-featured-image">
        <strong>{portfolioItem.fields["Project Title"] || "Untitled Project"}</strong>
      </p>
    );
  }
};

const PortfolioContent: React.FC<PortfolioContentProps> = ({ selectedDiscipline = "Featured" }) => {
  // Access projects data from airtableData
  const { projectsData } = airtableData;
  console.log("projectsData", projectsData);

  const handleLinkClick = (item: PortfolioItem) => {
    // Handle link click logic if needed
    console.log("Portfolio item clicked:", item);
  };

  const renderPortfolioContent = (selectedPortfolioContent: PortfolioItem[]) => {
    return selectedPortfolioContent.map((portfolioItem, index) => (
      <InViewAnimationTwo
        key={portfolioItem.id}
        rootMargin="-8% 0%"
        animation="fadeIn"
        duration="1s"
        animationdelay={`delay-${((index * 50) + 200)}ms`}
        fillmode="forwards"
        easing="ease-in-out"
        iteration="1"
        threshold="0.5"
        className="init-invisible"
      >
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
      </InViewAnimationTwo>
    ));
  };

  // Filter projects based on selectedDiscipline
  const selectedPortfolioContent = (projectsData as unknown as PortfolioItem[]).filter((item: PortfolioItem) => {
    if (!item.fields.Published) return false;
    if (selectedDiscipline === "Featured") return item.fields.Featured;
    return item.fields["Creative Discipline"]?.includes(selectedDiscipline);
  });

  // Sort items by date
  sortItemsByDate(selectedPortfolioContent);

  const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="portfolio-item-container">
      {selectedPortfolioContent.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ClientMasonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {renderPortfolioContent(selectedPortfolioContent)}
        </ClientMasonry>
      )}
    </div>
  );
};

export default PortfolioContent;
