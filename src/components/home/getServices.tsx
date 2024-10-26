// src/components/home/FetchServices.tsx
'use client';

import InViewAnimationTwo from "../utilities/InViewAnimationTwo";
import { useGlobalState } from "@/app/context/setGlobalState";

const FetchServices = function () {
  // Access services data from global state
  const { globalState } = useGlobalState();
  const servicesData = globalState.servicesData;

  // Render service data
  return (
    <>
      {servicesData.map((service, index) => (
        <div key={service.fields["Services Order"]}>
          <InViewAnimationTwo
            rootMargin="-25% 0%"
            animationdelay={`delay-${(index * 50) + 200}ms`}
            className="init-invisible"
            animation={undefined}
            duration={undefined}
            fillmode={undefined}
            easing={undefined}
            iteration={undefined}
            threshold={undefined}
          >
            <div className="block service padding-top-30 padding-bottom-30 padding-left-20 padding-right-20 border border-solid border-width-1 border-color-white bg-green-dark-4 small-padding-top-20 small-padding-bottom-20 small-padding-left-18 small-padding-right-18">
              <img
                className="block center w-25"
                src={`https://res.cloudinary.com/billymitchell/image/upload/q_auto:best/${service.fields["Services Image"]}`}
                alt={service.fields["Services Name"]}
              />
              <small className="text-center block margin-bottom-0 margin-top-20">
                {service.fields["Services Name"]}
              </small>
            </div>
          </InViewAnimationTwo>
        </div>
      ))}
    </>
  );
};

export default FetchServices;
