// src/components/home/FetchCompanies.tsx

// Import the pre-fetched Airtable data
import { airtableData } from '../utilities/getAirtableData';

const FetchCompanies = function () {
  // Access companies data from airtableData
  const { companiesData } = airtableData;

  // Filter for featured companies (checking fields.Feature)
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
