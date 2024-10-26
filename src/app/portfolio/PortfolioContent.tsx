// app/portfolio/PortfolioContent.tsx
'use client';

import React from 'react';
import ClientMasonry from "../../components/utilities/clientMasonry";
import InViewAnimationTwo from "../../components/utilities/InViewAnimationTwo";
import Link from 'next/link';
import { useGlobalState } from "../context/setGlobalState";

const sortItemsByDate = (selectedPortfolioContent) => {
  return selectedPortfolioContent.sort((firstObject, secondObject) => {
    const dateA = firstObject.fields['End Date'] ? new Date(firstObject.fields['End Date']) : null;
    const dateB = secondObject.fields['End Date'] ? new Date(secondObject.fields['End Date']) : null;

    if (dateA === null && dateB !== null) return -1;
    if (dateA !== null && dateB === null) return 1;
    if (dateA !== null && dateB !== null) return dateB - dateA;

    return 0;
  });
};

const IfFeaturedImage = (portfolioItem) => {
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

const renderPortfolioContent = (selectedPortfolioContent) => {
  return selectedPortfolioContent.map((portfolioItem, index) => (
    <InViewAnimationTwo
      key={portfolioItem.id}
      rootMargin="-8% 0%"
      animationdelay={`delay-${((index * 50) + 200)}ms`}
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
            }`,
          query: { id: `${index}` },
        }}>
          {IfFeaturedImage(portfolioItem)}
        </Link>
      </div>
    </InViewAnimationTwo>
  ));
};

const PortfolioContent = ({ selectedDiscipline = "Featured" }) => {
  const { globalState } = useGlobalState();
  console.log("Global State:", globalState); // Debugging line

  const portfolioData = globalState.projectsData || []; // Corrected to globalState.projectsData
  console.log("Portfolio Data:", portfolioData); // Debugging line

  // Filter projects based on selectedDiscipline
  const selectedPortfolioContent = portfolioData.filter(portfolioItem => {
    console.log("Portfolio Item:", JSON.stringify(portfolioItem)); // Debugging line

    if (!portfolioItem.fields.Published) return false;
    if (selectedDiscipline === "Featured") return portfolioItem.fields.Featured;
    return portfolioItem.fields["Creative Discipline"]?.includes(selectedDiscipline);
  });

  // Sort items by date
  sortItemsByDate(selectedPortfolioContent);

  const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Check if filtered content is empty
  console.log("Selected Portfolio Content:", selectedPortfolioContent); // Debugging line

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
