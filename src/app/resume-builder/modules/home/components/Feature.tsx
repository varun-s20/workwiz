import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function FeatureSection() {
  return (
    <>
      Feature
    </>
  );
}

const FeatureCard = ({ children }: { children: React.ReactNode }) => {
  return (
      <div
        className={`transition ease-in-out delay-100 duration-300 bg-resume-100 hover:bg-resume-500 text-resume-800
      hover:text-resume-50 fill-resume-800 px-6 py-10 lg:p-12 flex shadow-md cursor-pointer relative rounded-xl h-full`}
      >
        <Link href="/builder" passHref={true}>
        {children}
        </Link>
      </div>
  );
};

const CardPinnnedIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backdrop-blur-2xl bg-resume-100 rounded-full p-2 shadow-level-hard absolute right-0 top-0 -mt-4 -mr-1">
      {children}
    </div>
  );
};

export default FeatureSection;
