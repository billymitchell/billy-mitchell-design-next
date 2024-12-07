// app/portfolio/page.tsx
'use client';

import React, { useState } from 'react';
import PortfolioContent from './PortfolioContent';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectDisciplineButtons from './ProjectDisciplineButtons'; // Updated import

const Portfolio = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const discipline = searchParams.get('discipline');
  const search = searchParams.get('search');

  const [selectedDiscipline, setSelectedDiscipline] = useState('Featured');

  // Handle discipline button click
  const handleDisciplineSelect = (discipline) => {
    setSelectedDiscipline(discipline);
  };

  return (
    <div id="portfolio" className="bg-black">
      <div className="outer-container">
        <div className="inner-width">
          <h1>Featured Work</h1>
          <div className="button-container">
            {/* Render discipline buttons from ProjectDisciplineButtons component */}
            <ProjectDisciplineButtons
              onDisciplineSelect={handleDisciplineSelect}
            />
          </div>
        </div>
      </div>
      <div className="outer-container">
        <div className="inner-width-full">
          {/* PortfolioContent now handles filtering based on selectedDiscipline */}
          <PortfolioContent selectedDiscipline={selectedDiscipline} />
          <div className="text-center padding-top-15 padding-bottom-15">
            <a href="/portfolio/all">View All Other Published Portfolio Work</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
