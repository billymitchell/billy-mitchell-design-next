import { fetchAirtableData } from '../utilities/getAirtableData';
import InViewAnimationTwo from '../utilities/InViewAnimationTwo.js';
import servicesData from '../utilities/data/servicesData.json';

export default function FetchServices() {
  return servicesData.map((service, index) => (
    <div key={service.fields['Services Order']}>
      <InViewAnimationTwo
        rootMargin="-25% 0%"
        delay={`delay-${index * 50 + 200}ms`}
        className="init-invisible"
      >
        <div className="block service padding-top-30 padding-bottom-30 padding-left-20 padding-right-20 border border-solid border-width-1 border-color-white bg-green-dark-4 small-padding-top-20 mall-padding-bottom-20 small-padding-left-18 small-padding-right-18">
          {service.fields['Services Image'] && (
            <img
              className="block center w-25"
              src={`https://res.cloudinary.com/billymitchell/image/upload/q_auto:best/${service.fields['Services Image']}`}
              alt={service.fields['Services Name'] || 'Service'}
            />
          )}
          <small className="text-center block margin-top-20">
            {service.fields['Services Name']}
          </small>
        </div>
      </InViewAnimationTwo>
    </div>
  ));
}
