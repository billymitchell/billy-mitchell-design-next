// src/components/home/FetchCompanies.tsx
'use client';

import { useGlobalState } from "@/app/context/setGlobalState";

const FetchCompanies = function () {
  // Access companies data from global state
  const { globalState } = useGlobalState();
  const companiesData = globalState.companiesData;

  // Filter for featured companies (checking fields.Feature or _rawJson.fields.Feature)
  const featuredCompanies = companiesData.filter(
    (company) => company.fields?.Feature === true
  );

  // Render featured companies
  return (
    <div className="companies-container grid-container col-5 col-gap-60 small-col-3 small-col-gap-25">
      {featuredCompanies.map((portfolio_item) => (
        <img
          key={portfolio_item.id}
          className={`companies fluid justify-self-center align-self-center ${portfolio_item.fields['Company Name']
            .toLowerCase()
            .replace('&', 'and')
            .replace(/\s/gi, '-')}`}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/${portfolio_item.fields['Company Logo']}`}
          alt={portfolio_item.fields['Company Name']}
        />
      ))}
    </div>
  );
};

export default FetchCompanies;
