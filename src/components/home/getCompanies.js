// src/components/home/FetchCompanies.tsx

// Import the pre-fetched Airtable data
import companiesData from '../utilities/data/companiesData.json';
import InViewAnimationTwo from '../utilities/InViewAnimationTwo.js';


const FetchCompanies = function () {
  //Filter for featured companies (checking fields.Feature)
  const featuredCompanies = companiesData.filter(
    (company) => company.fields?.Feature === true
  );

  // Render featured companies
  return (
    <div className="companies-container grid-container col-5 col-gap-60 small-col-3 small-col-gap-25">
      {featuredCompanies.map((portfolio_item, index) => (
        <InViewAnimationTwo
        rootMargin="-25% 0%"
        delay={`delay-${index * 50 + 200}ms`}
        className="init-invisible"
        >
        <img
          key={portfolio_item.id}
          className={`companies fluid justify-self-center align-self-center ${portfolio_item.fields?.[
            'Company Name'
          ]
            ?.toString()
            .toLowerCase()
            .replace('&', 'and')
            .replace(/\s/gi, '-')}`}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/${portfolio_item.fields['Company Logo']}`}
          alt={portfolio_item.fields['Company Name']?.toString()}
        />
        </InViewAnimationTwo>
      ))}
    </div>
  );
};

export default FetchCompanies;
