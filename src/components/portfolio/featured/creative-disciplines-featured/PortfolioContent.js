'use client';

import React from 'react';
import ClientMasonry from "../../../utilities/clientMasonry";
import InViewAnimationTwo from "../../../utilities/InViewAnimationTwo";
import Link from 'next/link';
import { fetchPortfolioData } from "../../../../components/utilities/fetchPortfolioData"




const sortItemsByDate = (itemsArray) => {
  return itemsArray.sort((firstObject, secondObject) => {
    let dateA = firstObject['End Date'] ? new Date(firstObject['End Date']) : null;
    let dateB = secondObject['End Date'] ? new Date(secondObject['End Date']) : null;

    if (dateA === null && dateB !== null) {
      return -1;
    }

    if (dateA !== null && dateB === null) {
      return 1;
    }

    if (dateA !== null && dateB !== null) {
      return dateB - dateA;
    }

    return 0;
  });
};

const IfFeaturedImage = (portfolioItem) => {
  if (portfolioItem["Featured Image URL"]) {
    return (
      <>
        <img
          className="fluid"
          id={portfolioItem.id}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good/portfolio/${portfolioItem['Featured Image URL']}`}
          alt={portfolioItem["Project Title"] || "Untitled Project"}
        />
        <p className="title">
          <strong>{portfolioItem["Project Title"] || "Untitled Project"}</strong>
        </p>
      </>
    );
  } else {
    return (
      <p className="title-no-featured-image">
        <strong>{portfolioItem["Project Title"] || "Untitled Project"}</strong>
      </p>
    );
  }
};

const renderPortfolioContent = (discipline) => {
  return discipline.map((portfolioItem, index) => {
    const projectTitle = portfolioItem["Project Title"] || "Untitled Project";

    return (
      <InViewAnimationTwo
        key={portfolioItem.id}
        rootMargin="-8% 0%"
        animationdelay={`delay-${((index * 50) + 200)}ms`}
        className="init-invisible"
      >
        <div id={portfolioItem.id} className="portfolio-item">
          <Link href={`/portfolio/${projectTitle.toLowerCase().replace('&', 'and').replace(/\s/gi, '-').replace("/", "").replace(" / ", "")}`}>
            {IfFeaturedImage(portfolioItem)}
          </Link>
        </div>
      </InViewAnimationTwo>
    );
  });
};

const PortfolioContent = ({ discipline = [] }) => {
  if (!Array.isArray(discipline)) {
    discipline = [];
  }

  sortItemsByDate(discipline);

  const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="portfolio-item-container">
      <ClientMasonry
        breakpointCols={breakpointCols}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {renderPortfolioContent(discipline)}
      </ClientMasonry>
    </div>
  );
};

export default PortfolioContent;
