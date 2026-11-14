// src/components/home/FetchCompanies.tsx

// Import the pre-fetched Airtable data
import companiesData from '../utilities/data/companiesData.json';
import InViewAnimationTwo from '../utilities/InViewAnimationTwo.js';


const FetchCompanies = function () {
  //Filter for featured companies (checking fields.Feature)
  // companiesData holds every company (project pages need them all);
  // only featured ones meant for this site are shown here.
  const featuredCompanies = companiesData.filter(
    (company) =>
      company.fields?.Feature === true &&
      ['billymitchell.design', 'Both'].includes(company.fields?.['Render On'])
  );

  // Render featured companies
  return (
    <div className="companies-container grid-container col-5 col-gap-60 small-col-3 small-col-gap-25">
      <div className="flex">
        <img className="companies fluid justify-self-center align-self-center" src="/companies/Centricity.svg" alt="Centricity" loading="lazy" decoding="async" />
      </div>
      {featuredCompanies.map((portfolio_item, index) => (
        <InViewAnimationTwo
        key={portfolio_item.id}
        rootMargin="-25% 0%"
        delay={`delay-${index * 50 + 200}ms`}
        className="init-invisible flex"
        >
        <img
          className={`companies fluid justify-self-center align-self-center ${portfolio_item.fields?.[
            'Company Name'
          ]
            ?.toString()
            .toLowerCase()
            .replace('&', 'and')
            .replace(/\s/gi, '-')}`}
          src={`https://res.cloudinary.com/billymitchell/image/upload/f_auto,q_auto/${portfolio_item.fields['Company Logo']}`}
          alt={portfolio_item.fields['Company Name']?.toString()}
          loading="lazy"
          decoding="async"
        />
        </InViewAnimationTwo>
      ))}
    </div>
  );
};

export default FetchCompanies;
